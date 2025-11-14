import {
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  limitToLast,
} from "firebase/database";
import { database } from "./firebase";
import { Message } from "@/types";

export const sendMessage = async (
  groupId: string,
  userName: string,
  text: string
): Promise<void> => {
  if (!database) {
    throw new Error("Firebase database is not initialized. Please check your environment variables.");
  }

  const messagesRef = ref(database!, "messages");
  const newMessageRef = push(messagesRef);

  const message: Message = {
    id: newMessageRef.key!,
    groupId,
    userName,
    text,
    timestamp: Date.now(),
  };

  await set(newMessageRef, message);
};

export const subscribeToMessages = (
  groupId: string,
  callback: (messages: Message[]) => void,
  limit: number = 100
): (() => void) => {
  if (!database) {
    console.error("Firebase database is not initialized");
    return () => {}; // Return empty unsubscribe function
  }

  const messagesRef = ref(database!, "messages");
  const messagesQuery = query(
    messagesRef,
    orderByChild("groupId"),
    equalTo(groupId),
    limitToLast(limit)
  );

  const listener = onValue(messagesQuery, (snapshot) => {
    const messages: Message[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        messages.push(childSnapshot.val() as Message);
      });
    }

    // Sort by timestamp
    messages.sort((a, b) => a.timestamp - b.timestamp);

    callback(messages);
  });

  // Return unsubscribe function
  return () => {
    off(messagesQuery, "value", listener);
  };
};

export const getMessageHistory = async (
  groupId: string,
  limit: number = 100
): Promise<Message[]> => {
  if (!database) {
    console.error("Firebase database is not initialized");
    return [];
  }

  return new Promise((resolve) => {
    const messagesRef = ref(database!, "messages");
    const messagesQuery = query(
      messagesRef,
      orderByChild("groupId"),
      equalTo(groupId),
      limitToLast(limit)
    );

    onValue(
      messagesQuery,
      (snapshot) => {
        const messages: Message[] = [];

        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            messages.push(childSnapshot.val() as Message);
          });
        }

        // Sort by timestamp
        messages.sort((a, b) => a.timestamp - b.timestamp);

        resolve(messages);
      },
      { onlyOnce: true }
    );
  });
};
