export type UserRole = "reader" | "author" | "admin"; // 실제 ENUM 값에 맞게 수정 필요

export interface User {
  id: number;
  email: string;
  provider: string;
  providerId: string;
  readerName: string;
  authorName: string;
  topAuthor: boolean;
  profileImg?: string | null;
  role: UserRole;
  accntBank?: string | null;
  accntNum?: string | null;
  accntStatus: boolean;
  followingCnt: number;
  followerCnt: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
