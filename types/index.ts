export interface User {
  name: string;
  location: string;
  groupId: string;
  latitude?: number;
  longitude?: number;
  joinedAt: number;
}

export interface Message {
  id: string;
  groupId: string;
  userName: string;
  text: string;
  timestamp: number;
}

export interface ChatGroup {
  id: string;
  location: string;
  latitude?: number;
  longitude?: number;
  memberCount: number;
  createdAt: number;
}

export interface LocationData {
  name: string;
  latitude?: number;
  longitude?: number;
}
