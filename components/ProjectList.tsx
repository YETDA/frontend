"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Tag,
  Heart as HeartIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { popularProjectApi } from "@/apis/popular-project/api";

interface Project {
  id: number;
  title: string;
  thumbnail?: string | null;
  sponsorsCount?: number;
  projectLikeCount?: number;
  sellingAmount?: number;
}

export default function ProjectList() {
  const [sponsors, setSponsors] = useState<Project[]>([]);
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { content } = await popularProjectApi(0, 100);
        setSponsors(content.slice(0, 20));
        setProducts(content.slice(20, 40));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-20">로딩 중...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-12">
      <CarouselSection
        title="🌱 후원을 기다리고 있어요!"
        items={sponsors}
        basePath="/project/donation"
        viewLink="/list/donation"
        buttonIcon={<Gift className="w-5 h-5" />}
        showCount={p => `${p.sponsorsCount ?? 0}명 알림신청 중`}
      />
      <CarouselSection
        title="🛍️ 구매를 기다리고 있어요!"
        items={products}
        basePath="/project/purchase"
        viewLink="/list/purchase"
        buttonIcon={<Tag className="w-5 h-5" />}
        showCount={p => `${p.sellingAmount?.toLocaleString()}원 +`}
      />
    </div>
  );
}

function CarouselSection<T extends Project>(props: {
  title: string;
  items: T[];
  basePath: string;
  viewLink: string;
  buttonIcon: React.ReactNode;
  showCount: (p: T) => string;
}) {
  const { title, items, basePath, viewLink, buttonIcon, showCount } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Link
          href={viewLink}
          className="inline-flex items-center space-x-1 text-[#00A4FF] hover:underline"
        >
          <span>모두 보기</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={() => scrollBy(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 px-1"
        >
          {items.map(item => (
            <Link key={item.id} href={`${basePath}/${item.id}`}>
              <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow overflow-hidden relative">
                <div className="relative w-full pt-[75%]">
                  <Image
                    src={item.thumbnail ?? "/images/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-2 mb-1">
                    {item.title}
                  </p>

                  {viewLink.includes("donation") ? (
                    <p className="text-sm font-semibold text-[#FF4D7A] mb-2">
                      {Math.round(((item.sellingAmount ?? 0) / 20) * 100)}% 달성
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-[#FF4D7A] mb-2">
                      {item.sellingAmount ?? 0}명 구매
                    </p>
                  )}
                  <div className="text-xs text-gray-500 flex items-center">
                    {showCount(item)}
                    <span className="ml-2 px-1 py-0.5 border border-gray-300 rounded">
                      PICK
                    </span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-white">
                  <HeartIcon className="w-5 h-5" />
                </div>
                <button className="absolute bottom-3 right-3 flex items-center space-x-1 bg-gradient-to-r from-[#00A4FF] to-[#00A4FF]/80 text-white text-sm font-medium py-1 px-2 rounded-full">
                  {buttonIcon}
                  <span>바로가기</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scrollBy(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
