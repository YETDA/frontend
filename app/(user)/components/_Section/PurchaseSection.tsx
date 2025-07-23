"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PurchaseCard from "../PurchaseCard";

type SortKey = "price" | "sales" | "recent";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "sales", label: "판매량 순" },
  { value: "price", label: "가격 낮은 순" },
  { value: "recent", label: "최신 순" },
];

export type Purchase = {
  id: string;
  title: string;
  price: number;
  sales: number;
  thumbnail: string;
  seller: string;
  createdAt?: string;
};

// 더미 데이터
const DUMMY: Purchase[] = [
  {
    id: "p1",
    title: "모던 포트폴리오 템플릿",
    price: 12900,
    sales: 532,
    thumbnail: "/sample/4.png",
    seller: "이하랑",
    createdAt: "2025-07-10",
  },
  {
    id: "p2",
    title: "스타트업 IR 자료 템플릿",
    price: 19900,
    sales: 120,
    thumbnail: "/sample/3.png",
    seller: "김주영",
    createdAt: "2025-07-22",
  },
  {
    id: "p3",
    title: "앱 런칭 프로모션 배너 세트",
    price: 8900,
    sales: 880,
    thumbnail: "/sample/2.png",
    seller: "박민지",
    createdAt: "2025-06-30",
  },
  {
    id: "p4",
    title: "회사 소개서 파워포인트 템플릿",
    price: 15900,
    sales: 342,
    thumbnail: "/sample/1.png",
    seller: "최영우",
    createdAt: "2025-07-18",
  },
];

export default function PurchaseSection() {
  const [sort, setSort] = useState<SortKey>("sales");

  const sorted = useMemo(() => {
    const arr = [...DUMMY];
    switch (sort) {
      case "price":
        return arr.sort((a, b) => a.price - b.price);
      case "recent":
        return arr.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        );
      case "sales":
      default:
        return arr.sort((a, b) => b.sales - a.sales);
    }
  }, [sort]);

  return (
    <section className="w-full py-20 bg-[#FAFAFC] xl:px-[10vw] full-bleed">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[22px] font-bold">
          <span
            className="relative inline-block
               after:content-[''] after:absolute after:inset-x-0
               after:bottom-0 after:h-[0.55em]
               after:bg-[#C599FF] after:rounded-sm
               after:-z-10"
          >
            추천하는
          </span>{" "}
          구매 프로젝트
        </h2>

        <Select value={sort} onValueChange={(v: SortKey) => setSort(v)}>
          <SelectTrigger className="w-[213px] h-[40px] bg-white">
            <SelectValue placeholder="정렬 선택" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(opt => (
              <SelectItem
                className="bg-white p-0"
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {sorted.map(item => (
          <PurchaseCard key={item.id} project={item} />
        ))}
      </div>
    </section>
  );
}
