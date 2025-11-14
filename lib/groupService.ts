import { ref, get, set, update, push } from "firebase/database";
import { database } from "./firebase";
import { ChatGroup } from "@/types";
import { normalizeLocationName } from "./locationService";

export const findOrCreateGroup = async (
  location: string
): Promise<string> => {
  if (!database) {
    throw new Error("Firebase database is not initialized. Please check your environment variables.");
  }

  const normalizedInputLocation = normalizeLocationName(location);
  const groupsRef = ref(database!, "groups");
  const snapshot = await get(groupsRef);

  if (snapshot.exists()) {
    const groups = snapshot.val() as Record<string, ChatGroup>;

    // Cari group dengan lokasi yang sama (exact match)
    for (const [groupId, group] of Object.entries(groups)) {
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

  // Jika tidak ada group yang cocok, buat group baru
  const newGroupRef = push(ref(database!, "groups"));
  const newGroupId = newGroupRef.key!;

  const newGroup: ChatGroup = {
    id: newGroupId,
    location,
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
