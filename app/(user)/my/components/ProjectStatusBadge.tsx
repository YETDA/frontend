import { Clock, CheckCircle, Ban, Hourglass } from "lucide-react"; // 또는 react-icons 사용 가능

export function getStatusBadge(status: string) {
  switch (status) {
    case "UNDER_AUDIT":
      return (
        <>
          <Hourglass className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-blue-600 font-semibold">심사중</span>
        </>
      );
    case "REJECTED":
      return (
        <>
          <Ban className="w-3.5 h-3.5 text-red-500" />
          <span className="text-red-600 font-semibold">거절됨</span>
        </>
      );
    case "RECRUITING":
      return (
        <>
          <Clock className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-yellow-600 font-semibold">모집중</span>
        </>
      );
    case "COMPLETED":
      return (
        <>
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-600 font-semibold">완료</span>
        </>
      );
    default:
      return null;
  }
}
