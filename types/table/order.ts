export type OrderField = "example1" | "example2"; // 실제 ENUM 값에 맞게 수정 필요

export interface Order {
  id: number;
  userId: number;
  fundingId: number;
  field: OrderField;
}
