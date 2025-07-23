"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import { formatKRW } from "@/lib/formatKRW";

export type Purchase = {
  id: string;
  title: string;
  price: number;
  sales: number;
  thumbnail: string;
  seller: string;
  createdAt?: string;
};

export default function PurchaseCard({ project }: { project: Purchase }) {
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

      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-[#6C37FF] font-semibold text-[16px] leading-tight">
          {formatKRW(project.price)}
        </p>
        <span className="text-gray-500 text-[13px]">
          / 판매 {project.sales}건
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[14px] text-gray-700">
        <UserRound className="h-4 w-4" />
        {project.seller}
      </div>
    </div>
  );
}
