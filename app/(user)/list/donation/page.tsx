"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { popularProjectApi } from "@/apis/popular-project/api";

interface Project {
  id: number;
  title: string;
  thumbnail?: string | null;
  sponsorsCount?: number;
}

export default function DonationListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { content } = await popularProjectApi(0, 100);
        setProjects(content.slice(0, 20));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-20">로딩 중…</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">후원 프로젝트 목록</h2>
      <div className="grid grid-cols-4 gap-6">
        {projects.map(p => (
          <Link
            key={p.id}
            href={`/project/donation/${p.id}`}
            className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
          >
            <div className="relative w-full pt-[75%]">
              <Image
                src={p.thumbnail ?? "/images/placeholder.png"}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium line-clamp-2 mb-2">{p.title}</p>
              <p className="text-sm text-gray-600">
                {p.sponsorsCount ?? 0}명 알림신청 중
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
