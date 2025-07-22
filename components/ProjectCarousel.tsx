"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  Coins,
  ChevronRight,
  ChevronLeft,
  Heart as HeartIcon,
} from "lucide-react";
import { popularProjectApi } from "@/apis/popular-project/api";

export interface Project {
  id: string;
  title: string;
  projectType: "DONATION" | "SALE";
  thumbnail?: string | null;
  creator?: { followers?: number };
  likes?: number;
  currentFunding?: number;
  fundingPeriod?: { end: string };
}

export function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerIndex, setCenterIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    (async () => {
      try {
        const { content } = await popularProjectApi(0, 9);
        setProjects(content);
      } catch {
        console.error("인기 프로젝트 로드 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center py-20">로딩 중…</p>;

  const wrap = (i: number) =>
    ((i % projects.length) + projects.length) % projects.length;

  const handlePage = (dir: -1 | 1) => {
    setDirection(dir);
    setCenterIndex(prev => wrap(prev + dir));
  };

  const left = wrap(centerIndex - 1);
  const right = wrap(centerIndex + 1);

  const Card: React.FC<{ project: Project; isCenter?: boolean }> = ({
    project: p,
    isCenter = false,
  }) => (
    <div
      className={`
        relative bg-white rounded-2xl overflow-hidden
        flex-shrink-0 transition-all duration-500
        ${isCenter ? "w-80 h-[28rem] shadow-lg scale-100" : "w-60 h-[24rem] shadow-md scale-90 opacity-70"}
      `}
    >
      <Link
        href={
          p.projectType === "DONATION"
            ? `/project/donation/${p.id}`
            : `/project/sell/${p.id}`
        }
        className="block relative h-2/3"
      >
        <Image
          src={p.thumbnail || "/images/placeholder.png"}
          alt={p.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="p-4 flex flex-col h-1/3">
        <h3 className="text-lg font-semibold line-clamp-2 mb-1">{p.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <div className="flex items-center bg-[#E6F4FF] px-2 py-0.5 rounded-full">
            <Users className="w-4 h-4 text-[#00A4FF]" />
            <span className="ml-1">{p.creator?.followers ?? 0}</span>
          </div>
          <div className="flex items-center bg-[#FFE6F0] px-2 py-0.5 rounded-full">
            <HeartIcon className="w-4 h-4 text-[#FF4D7A]" />
            <span className="ml-1">{p.likes ?? 0}</span>
          </div>
          {p.fundingPeriod?.end && (
            <div className="flex items-center bg-[#E6F4FF] px-2 py-0.5 rounded-full">
              <Clock className="w-4 h-4 text-[#00A4FF]" />
              <span className="ml-1">
                {Math.max(
                  0,
                  Math.ceil(
                    (new Date(p.fundingPeriod.end).getTime() - Date.now()) /
                      86400000,
                  ),
                )}
                일 남음
              </span>
            </div>
          )}
        </div>
        {p.currentFunding != null && (
          <div className="text-center mb-2">
            <div className="text-xl font-bold text-[#00A4FF]">
              {p.currentFunding.toLocaleString()}원
            </div>
            <div className="text-xs text-gray-500">총 후원액</div>
          </div>
        )}
        <button className="mt-auto w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-[#00A4FF] to-[#0064FF] hover:from-[#0064FF] hover:to-[#00A4FF] text-white text-sm py-2 rounded-full transition">
          <Coins className="w-4 h-4" />
          <span>후원하기</span>
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-[#00A4FF]">인기 프로젝트</h2>
          <Link
            href="/projects"
            className="text-[#00A4FF] hover:underline flex items-center"
          >
            모두 보기 <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="relative flex justify-center items-center space-x-6">
          <button onClick={() => handlePage(-1)} className="p-1">
            <ChevronLeft className="w-8 h-8 text-gray-600 hover:text-gray-800" />
          </button>

          <Card project={projects[left]} />

          <div className="relative w-80 h-[28rem] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={centerIndex}
                custom={direction}
                initial={{ x: direction * 300, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: direction * -300, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card project={projects[centerIndex]} isCenter />
              </motion.div>
            </AnimatePresence>
          </div>

          <Card project={projects[right]} />

          <button onClick={() => handlePage(1)} className="p-1">
            <ChevronRight className="w-8 h-8 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
