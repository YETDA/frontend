"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  projectFirstImage?: string | null;
  sellingAmount?: number;
}

interface Category {
  id: number;
  name: string;
}

export default function PurchaseListPage() {
  const categories: Category[] = [
    { id: 1, name: "앱/서비스" },
    { id: 2, name: "Notion 템플릿" },
    { id: 3, name: "슬라이드/제안서" },
    { id: 4, name: "자동화 툴" },
    { id: 5, name: "디자인 리소스" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/purchase/category/${selectedCategory}`,
        {
          params: {
            projectStatus: "UNDER_AUDIT",
            page: 0,
            size: 20,
          },
          withCredentials: true,
        },
      )
      .then(res => {
        setProjects(res.data.data.content || []);
      })
      .catch(err => {
        console.error(err);
        setError("프로젝트를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">구매 가능 프로젝트</h2>

      {/* 카테고리 탭 */}
      <div className="flex space-x-4 border-b mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={
              selectedCategory === cat.id
                ? "pb-2 text-[#0064FF] font-medium border-b-2 border-[#0064FF]"
                : "pb-2 text-gray-600 hover:text-gray-800 transition"
            }
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 상태 표시 */}
      {loading ? (
        <p className="text-center py-10">로딩 중…</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          선택된 카테고리에 프로젝트가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {projects.map(p => (
            <Link
              key={p.id}
              href={`/project/purchase/${p.id}`}
              className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
            >
              <div className="relative w-full pt-[75%]">
                <Image
                  src={p.projectFirstImage ?? "/images/placeholder.png"}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium line-clamp-2 mb-2">
                  {p.title}
                </p>
                <p className="text-sm text-gray-600">
                  ₩{(p.sellingAmount ?? 0).toLocaleString()} 원
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
