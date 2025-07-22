"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gift, Tag } from "lucide-react";
import { popularProjectApi } from "@/apis/popular-project/api";

interface Project {
  id: string;
  title: string;
  thumbnail?: string | null;
  sponsorsCount?: number;
  sellingAmount?: number;
}

const PER_PAGE = 4;

export default function ProjectList() {
  const [sponsors, setSponsors] = useState<Project[]>([]);
  const [products, setProducts] = useState<Project[]>([]);
  const [spPage, setSpPage] = useState(0);
  const [prPage, setPrPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { content } = await popularProjectApi(0, 100);
        setSponsors(content.slice(0, 20));
        setProducts(content.slice(20, 40));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-20">로딩 중…</p>;
  }

  const spTotal = Math.ceil(sponsors.length / PER_PAGE);
  const prTotal = Math.ceil(products.length / PER_PAGE);
  const spSlice = sponsors.slice(
    spPage * PER_PAGE,
    spPage * PER_PAGE + PER_PAGE,
  );
  const prSlice = products.slice(
    prPage * PER_PAGE,
    prPage * PER_PAGE + PER_PAGE,
  );

  const CardWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      {children}
    </div>
  );

  return (
    <div className="space-y-16 px-4">
      <div className="container mx-auto px-6 py-4">
        <h3 className="text-xl font-bold mb-4">후원을 기다리고 있어요!</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {spSlice.map(p => (
            <div key={p.id} className="flex">
              <Link href={`/project/sell/${p.id}`} className="flex-1">
                <CardWrapper>
                  <div className="relative h-96 w-full">
                    <Image
                      src={p.thumbnail || "/images/placeholder.png"}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-lg font-semibold line-clamp-2 mb-4">
                      {p.title}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                      <div className="flex items-center bg-[#E6F4FF] px-3 py-1 rounded-full">
                        <span>{p.sponsorsCount ?? 0}명 후원</span>
                      </div>
                    </div>
                    <button className="mt-auto w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00A4FF] to-[#0064FF] hover:from-[#0064FF] hover:to-[#00A4FF] text-white text-base py-3 rounded-full transition">
                      <Gift className="w-5 h-5" />
                      <span>후원하기</span>
                    </button>
                  </div>
                </CardWrapper>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => setSpPage(p => Math.max(0, p - 1))}
            disabled={spPage === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span>
            {spPage + 1} / {spTotal}
          </span>
          <button
            onClick={() => setSpPage(p => (p < spTotal - 1 ? p + 1 : p))}
            disabled={spPage >= spTotal - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-4">
        <h3 className="text-xl font-bold mb-4">업무 생산성 극대화!</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {prSlice.map(p => (
            <div key={p.id} className="flex">
              <Link href={`/project/sell/${p.id}`} className="flex-1">
                <CardWrapper>
                  <div className="relative h-96 w-full">
                    <Image
                      src={p.thumbnail || "/images/placeholder.png"}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-lg font-semibold line-clamp-2 mb-4">
                      {p.title}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                      <div className="flex items-center bg-[#E6F4FF] px-3 py-1 rounded-full">
                        <span>{p.sellingAmount?.toLocaleString() ?? 0}원</span>
                      </div>
                    </div>
                    <button className="mt-auto w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00A4FF] to-[#0064FF] hover:from-[#0064FF] hover:to-[#00A4FF] text-white text-base py-3 rounded-full transition">
                      <Tag className="w-5 h-5" />
                      <span>구매하기</span>
                    </button>
                  </div>
                </CardWrapper>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => setPrPage(p => Math.max(0, p - 1))}
            disabled={prPage === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span>
            {prPage + 1} / {prTotal}
          </span>
          <button
            onClick={() => setPrPage(p => (p < prTotal - 1 ? p + 1 : p))}
            disabled={prPage >= prTotal - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
