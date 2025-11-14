import { ref, get, set, update, push } from "firebase/database";
import { database } from "./firebase";
import { ChatGroup } from "@/types";
import { normalizeLocationName, calculateDistance } from "./locationService";

const DISTANCE_THRESHOLD_KM = 50; // Jarak maksimum untuk dianggap lokasi yang sama (dalam km)

export const findOrCreateGroup = async (
  location: string,
  latitude?: number,
  longitude?: number
): Promise<string> => {
  if (!database) {
    throw new Error("Firebase database is not initialized. Please check your environment variables.");
  }

  const groupsRef = ref(database!, "groups");
  const snapshot = await get(groupsRef);

  if (snapshot.exists()) {
    const groups = snapshot.val() as Record<string, ChatGroup>;

    // Cari group dengan lokasi yang sama atau terdekat
    for (const [groupId, group] of Object.entries(groups)) {
      // Jika ada koordinat, gunakan jarak untuk matching
      if (latitude && longitude && group.latitude && group.longitude) {
        const distance = calculateDistance(
          latitude,
          longitude,
          group.latitude,
          group.longitude
        );

        if (distance <= DISTANCE_THRESHOLD_KM) {
          // Update member count
          await update(ref(database!, `groups/${groupId}`), {
            memberCount: (group.memberCount || 0) + 1,
          });
          return groupId;
        }
      } else {
        // Jika tidak ada koordinat, match berdasarkan nama lokasi
        const normalizedInputLocation = normalizeLocationName(location);
        const normalizedGroupLocation = normalizeLocationName(group.location);

        if (normalizedInputLocation === normalizedGroupLocation) {
          // Update member count
          await update(ref(database!, `groups/${groupId}`), {
            memberCount: (group.memberCount || 0) + 1,
          });
          return groupId;
        }
      }
    }
  }

  // Jika tidak ada group yang cocok, buat group baru
  const newGroupRef = push(ref(database!, "groups"));
  const newGroupId = newGroupRef.key!;

  const newGroup: ChatGroup = {
    id: newGroupId,
    location,
    latitude,
    longitude,
    memberCount: 1,
    createdAt: Date.now(),
  };

  await set(newGroupRef, newGroup);
  return newGroupId;
};

export const getGroupInfo = async (groupId: string): Promise<ChatGroup | null> => {
  if (!database) {
    console.error("Firebase database is not initialized");
    return null;
  }

  const groupRef = ref(database!, `groups/${groupId}`);
  const snapshot = await get(groupRef);

  if (snapshot.exists()) {
    return snapshot.val() as ChatGroup;
  }

  return null;
};

export const decrementGroupMemberCount = async (groupId: string): Promise<void> => {
  if (!database) {
    console.error("Firebase database is not initialized");
    return;
  }

  const groupRef = ref(database!, `groups/${groupId}`);
  const snapshot = await get(groupRef);

  if (snapshot.exists()) {
    const group = snapshot.val() as ChatGroup;
    const newCount = Math.max(0, (group.memberCount || 1) - 1);

    await update(groupRef, {
      memberCount: newCount,
    });
  }
};
