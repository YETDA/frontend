"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PundingCard from "../PundingCard";

export type Punding = {
  id: string;
  title: string;
  raised: number;
  minPrice: number;
  thumbnail: string;
  owner: string;
  likes: number;
  createdAt?: string;
};

type SortKey = "like" | "amount" | "recent";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "like", label: "좋아요 순" },
  { value: "amount", label: "모금액 순" },
  { value: "recent", label: "최신 순" },
];

// 더미 데이터
const DUMMY: Punding[] = [
  {
    id: "1",
    title: "명함 제작, 심플하고 세련된 디자인까지",
    raised: 1305500,
    minPrice: 500,
    thumbnail: "/sample/1.png",
    owner: "김주영",
    likes: 132,
    createdAt: "2025-07-20",
  },
  {
    id: "2",
    title: "크몽어워즈수상 홈페이지 맞춤제작",
    raised: 707500,
    minPrice: 5500,
    thumbnail: "/sample/2.png",
    owner: "김주영",
    likes: 98,
    createdAt: "2025-07-18",
  },
  {
    id: "3",
    title: "웹사이트를 안드로이드 웹앱으로",
    raised: 307500,
    minPrice: 1500,
    thumbnail: "/sample/3.png",
    owner: "김주영",
    likes: 45,
    createdAt: "2025-07-10",
  },
  {
    id: "4",
    title: "스타트업 IR 멘토링 및 IR 자료 제작",
    raised: 302100000,
    minPrice: 100000,
    thumbnail: "/sample/4.png",
    owner: "김주영",
    likes: 201,
    createdAt: "2025-06-30",
  },
];

export default function PundingSection() {
  const [sort, setSort] = useState<SortKey>("like");

  const sorted = useMemo(() => {
    const cloned = [...DUMMY];
    switch (sort) {
      case "amount":
        return cloned.sort((a, b) => b.raised - a.raised);
      case "recent":
        return cloned.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        );
      case "like":
      default:
        return cloned.sort((a, b) => b.likes - a.likes);
    }
  }, [sort]);

  return (
    <section className="w-full mt-16 pt-20 xl:px-[10vw] bg-[#FAFAFC] full-bleed">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[22px] font-bold">
          <span
            className="relative inline-block
               after:content-[''] after:absolute after:inset-x-0
               after:bottom-0 after:h-[0.55em]
               after:bg-[#AEE5FF] after:rounded-sm
               after:-z-10"
          >
            추천하는
          </span>{" "}
          후원 프로젝트
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
        {sorted.map(p => (
          <PundingCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
