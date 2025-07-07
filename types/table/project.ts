export type AuditStatus = "pending" | "in_progress" | "approved" | "rejected";

export interface Project {
  id: number;
  userId: number;
  category: string;
  genre: string;
  outline: string;
  title: string;
  oneLiner: string;
  thumbnail: string;
  goalAmt: number;
  deadlineAt: string | Date;
  likeCnt: number;
  reviewCnt: number;
  auditStatus: AuditStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}
