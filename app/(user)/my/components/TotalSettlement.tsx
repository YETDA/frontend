"use client";

import { useEffect, useState } from "react";
import { MyCard } from "./ui/MyCard";
import { Clock, DollarSign } from "lucide-react";

// 정산 상태 타입
type SettlementStatus = "WAITING" | "APPROVED" | "DONE" | "CANCELED";

interface SettlementHistoryItem {
  title: string;
  amount: number;
  status: SettlementStatus;
  completedAt?: string;
}

export function TotalSettlementCard() {
  const [expectedDate, setExpectedDate] = useState<string>("");
  const [history, setHistory] = useState<SettlementHistoryItem[]>([]);

  useEffect(() => {
    setExpectedDate(getNextSettlementDate());

    // 더미 데이터 세팅
    setHistory([
      {
        title: "AI 그림 그리기 앱",
        amount: 1250000,
        status: "DONE",
        completedAt: "2024.02.15",
      },
      {
        title: "React UI 템플릿",
        amount: 870000,
        status: "CANCELED",
        completedAt: "2024.03.21",
      },
      {
        title: "Python 챗봇 키트",
        amount: 1390000,
        status: "WAITING",
      },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-800">정산</h4>

      {/* 요청 및 상태 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MyCard className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 pt-1">
            <DollarSign className="text-green-500" />
            <h5>정산 예정 금액</h5>
          </div>
          <div className="flex items-center text-green-600 font-semibold text-2xl pl-5">
            <div>1,602,000 원</div>
          </div>
        </MyCard>

        <MyCard className="bg-blue-50 p-6 rounded-xl">
          <h5 className="text-gray-700">정산 상태</h5>
          <div className="flex items-center gap-2 mt-1 text-blue-600 font-semibold text-sm">
            <Clock className="h-4 w-4" />
            승인 대기 중
          </div>
          <div className="text-xs text-gray-500 mt-1">
            예상 처리일: {expectedDate}
          </div>
        </MyCard>
      </div>

      {/* 정산 내역 */}
      <div>
        <h5 className="text-sm font-semibold text-gray-800 mb-2">정산 내역</h5>
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 mb-2 border border-gray-200 rounded-xl bg-white"
            >
              {/* 좌측: 제목 + 정산일 */}
              <div className="flex flex-col">
                <div className="font-semibold text-sm text-gray-800">
                  {item.title}
                </div>
                {item.completedAt && (
                  <div className="text-xs text-gray-500">
                    {item.completedAt} 정산 완료
                  </div>
                )}
              </div>

              {/* 우측: 금액 + 상태 */}
              <div className="flex flex-col items-end">
                <div className="text-blue-600 font-bold text-sm">
                  {item.amount.toLocaleString()}원
                </div>
                <div
                  className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                    item.status === "DONE"
                      ? "text-green-600 bg-green-100"
                      : item.status === "WAITING"
                        ? "text-yellow-600 bg-yellow-100"
                        : item.status === "CANCELED"
                          ? "text-red-600 bg-red-100"
                          : "text-blue-600 bg-blue-100" // APPROVED
                  }`}
                >
                  {getStatusLabel(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 다음 정산일 계산: 오늘이 7/23이면 → 8/21
function getNextSettlementDate(): string {
  const today = new Date();
  const nextMonth = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = new Date(year, nextMonth, 21);
  return date.toISOString().slice(0, 10);
}

// 상태 텍스트
function getStatusLabel(status: SettlementStatus): string {
  switch (status) {
    case "DONE":
      return "완료";
    case "WAITING":
      return "승인 대기";
    case "APPROVED":
      return "승인됨";
    case "CANCELED":
      return "취소됨";
  }
}

// 상태 색상
function getStatusColor(status: SettlementStatus): string {
  switch (status) {
    case "DONE":
      return "text-green-600";
    case "WAITING":
    case "APPROVED":
      return "text-blue-600";
    case "CANCELED":
      return "text-red-500";
  }
}
