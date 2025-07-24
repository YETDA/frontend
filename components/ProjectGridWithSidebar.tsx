"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { popularProjectApi } from "@/apis/popular-project/api";

export interface Project {
  id: string;
  title: string;
  projectType: "DONATION" | "SALE";
  thumbnail?: string | null;
}

function SidebarItem({ project, rank }: { project: Project; rank: number }) {
  const href =
    project.projectType === "DONATION"
      ? `/project/donation/${project.id}`
      : `/project/sell/${project.id}`;

  return (
    <li className="flex items-center space-x-3 py-2">
      <span className="font-bold text-lg text-gray-400">{rank}</span>
      <Link href={href} className="flex-1 flex items-center space-x-2">
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
          <Image
            src={project.thumbnail || "/images/placeholder.png"}
            alt={project.title}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <span className="truncate text-sm">{project.title}</span>
      </Link>
      <button className="ml-auto text-gray-400 hover:text-gray-600">♥</button>
    </li>
  );
}

export function ProjectGridWithSidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { content } = await popularProjectApi(0, 16);
        setProjects(content);
      } catch {
        console.error("프로젝트 로드 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-center py-20">로딩 중…</p>;
  }

  const gridProjects = projects.slice(0, 8);
  const sidebarProjects = projects.slice(8, 16);

  return (
    <div className="container mx-auto px-6 py-8 flex gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">주목할 만한 프로젝트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridProjects.map(p => {
            const href =
              p.projectType === "DONATION"
                ? `/project/donation/${p.id}`
                : `/project/purchase/${p.id}`;
            return (
              <Link
                key={p.id}
                href={href}
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
                  <button
                    className={`text-sm font-medium py-1 px-3 rounded-full transition
                      ${
                        p.projectType === "DONATION"
                          ? "bg-gradient-to-r from-[#E9529B] to-[#E9529B]/80 text-white"
                          : "bg-gradient-to-r from-[#B068F6] to-[#B068F6]/80 text-white"
                      }`}
                  >
                    {p.projectType === "DONATION" ? "후원" : "구매"}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 사이드바 */}
      <aside className="w-80 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">인기 프로젝트</h2>
          <Link
            href="/projects"
            className="text-sm text-[#00A4FF] hover:underline flex items-center"
          >
            모두 보기 <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <ul>
          {sidebarProjects.map((p, i) => (
            <SidebarItem key={p.id} project={p} rank={i + 1} />
          ))}
        </ul>
      </aside>
    </div>
  );
}
