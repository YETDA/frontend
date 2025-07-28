"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  popularPurchaseProjectApi,
  popularDonationProjectApi,
} from "@/apis/popular-project/api";

export interface Project {
  id: string;
  title: string;
  thumbnail?: string | null;
}

export function ProjectGridWithSidebar() {
  const [purchaseProjects, setPurchaseProjects] = useState<Project[]>([]);
  const [donationProjects, setDonationProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const purchaseData = await popularPurchaseProjectApi(0, 8);
        const donationData = await popularDonationProjectApi(0, 8);
        setPurchaseProjects(purchaseData.content || purchaseData);
        setDonationProjects(donationData.content || donationData);
      } catch (e) {
        console.error("프로젝트 로드 실패", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-center py-20">로딩 중…</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 flex gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">인기 구매 프로젝트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {purchaseProjects.map(p => (
            <Link
              key={p.id}
              href={`/project/purchase/${p.id}`}
              className="block bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition"
            >
              <div className="relative h-48">
                <Image
                  src={p.thumbnail || "/images/placeholder.png"}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                  {p.title}
                </h3>
                <button className="text-sm font-medium py-1 px-3 rounded-full bg-gradient-to-r from-[#B068F6] to-[#B068F6]/80 text-white transition">
                  구매
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <aside className="w-80 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">인기 후원 프로젝트</h2>
          <Link
            href="/list/donation"
            className="text-sm text-[#00A4FF] hover:underline flex items-center"
          >
            모두 보기 <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <ul>
          {donationProjects.map((p, i) => (
            <li key={p.id} className="flex items-center space-x-3 py-2">
              <span className="font-bold text-lg text-gray-400">{i + 1}</span>
              <Link
                href={`/project/donation/${p.id}`}
                className="flex-1 flex items-center space-x-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={p.thumbnail || "/images/placeholder.png"}
                    alt={p.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="truncate text-sm">{p.title}</span>
              </Link>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                ♥
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
