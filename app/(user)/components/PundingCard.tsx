"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import type { Punding } from "./_Section/PundingSection";
import { formatKRW } from "@/lib/formatKRW";

export default function PundingCard({ project }: { project: Punding }) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 25vw"
        />
      </div>

      <h3 className="mt-3 text-[18px] font-semibold leading-snug line-clamp-2">
        {project.title}
      </h3>

      <div className="mt-2">
        <p className="text-[#6C37FF] font-semibold text-[16px] leading-tight">
          {formatKRW(project.raised)} 모금
        </p>
        <p className="text-gray-500 text-[14px]">
          {formatKRW(project.minPrice)} ~
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[14px] text-gray-700">
        <UserRound className="h-4 w-4" />
        {project.owner}
      </div>
    </div>
  );
}
