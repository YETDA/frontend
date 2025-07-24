import { Clock, CheckCircle, XCircle } from "lucide-react";

export function getSettlementBadge(status: string) {
  switch (status) {
    case "WAITING":
      return (
        <>
          <Clock className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-yellow-600 font-semibold">검토 중</span>
        </>
      );
    case "COMPLETED":
      return (
        <>
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-600 font-semibold">승인 완료</span>
        </>
      );
    case "FAILED":
      return (
        <>
          <XCircle className="w-3.5 h-3.5 text-red-500" />
          <span className="text-red-600 font-semibold">승인 실패</span>
        </>
      );
    default:
      return null;
  }
}
