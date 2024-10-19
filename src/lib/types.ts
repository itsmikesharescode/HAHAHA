import type { Timestamp } from 'firebase/firestore';

export type Chats = {
  userUUID: string;
  chat: string;
  displayName: string;
  email: string;
  photoURL: string;
  timeStamp: Timestamp | null;
};
