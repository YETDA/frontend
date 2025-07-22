"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  hostName: string;
  thumbnail: string;
  title: string;
  sellingAmount: number;
};

export default function ProjectCard({
  hostName,
  thumbnail,
  title,
  sellingAmount,
}: ProjectCardProps) {
  return (
    <Card className="w-full max-w-[280px] rounded-xl overflow-hidden flex flex-col shadow hover:shadow-md transition">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-video bg-gray-100">
          <Image
            src={thumbnail}
            alt="Project Image"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-1 p-4 gap-2">
        <div className="text-xs text-gray-500">{hostName}</div>
        <CardTitle className="text-md truncate">{title}</CardTitle>
        <div className="text-sm text-blue-600 font-medium">
          {sellingAmount.toLocaleString()}회 판매
        </div>
        <Badge
          variant="outline"
          className="self-start py-1 px-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white border-none"
        >
          좋은 창작자
        </Badge>
      </CardContent>
    </Card>
  );
}
