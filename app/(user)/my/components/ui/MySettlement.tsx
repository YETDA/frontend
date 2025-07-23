import { Card, CardTitle } from "@/components/ui/card";
import { getSettlementBadge } from "../SettlementStatusBadge";
import Image from "next/image";

interface ProjectProps {
  id: number;
  title: string;
  periodStart: Date;
  periodEnd: Date;
  totalOrderAmount: number;
  feeAmount: number;
  payoutAmount: number;
  contentImageUrls: string;
  settlementStatus: string;
}

interface MyProjectCardProps {
  project: ProjectProps;
}

export default function MySettlement({ project }: MyProjectCardProps) {
  return (
    <Card className="w-full max-w-[1000px] rounded-xl overflow-hidden flex flex-row items-center justify-between border border-gray-200 p-4 shadow-sm items-center">
      <div className="flex flex-row items-center gap-4">
        {/* 이미지 */}
        <div className="relative w-[64px] h-[64px] rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={project.contentImageUrls}
            alt="Project Image"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        {/* 텍스트 정보 */}
        <div className="flex flex-col justify-between">
          <CardTitle className="text-sm font-semibold text-black">
            {project.title}
          </CardTitle>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            {getSettlementBadge(project.settlementStatus)}
          </div>
        </div>
      </div>
      {/* 오른쪽: 금액 */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-blue-600 font-bold text-sm">
          {project.payoutAmount}
        </span>
        <span className="text-green-500 text-xs">완료</span>
      </div>
    </Card>
  );
}
