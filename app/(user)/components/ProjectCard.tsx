import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectCard() {
  return (
    <Card className="w-full max-w-[280px] max-h-[330px] rounded-xl overflow-hidden flex flex-col">
      <CardHeader>
        <div className="relative w-full h-30">
          <Image
            src="/images/sample-card.png"
            alt="Project Image"
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between gap-2.5 p-4">
        <div className="text-xs color-[#868E96]">capstone</div>
        <CardTitle className="text-md">직장인 포트폴리오(디자인)</CardTitle>
        <div className="text-title">1,237회 판매</div>
        <Badge
          variant="outline"
          className="py-1 px-2 w-fit h-fit bg-gradient-to-r from-[#1F9EFF] to-[#0064FF] text-white border-none"
        >
          좋은 창작자
        </Badge>
      </CardContent>
    </Card>
  );
}
