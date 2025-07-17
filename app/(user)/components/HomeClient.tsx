"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { popularProjectApi } from "@/apis/popular-project/api";

import HomeCarousel from "./HomeCarousel";
import ProjectCard from "./ProjectCard";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      document.cookie = `accessToken=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax`;
      router.replace("/");
    }
  }, [searchParams, router]);

  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  return (
    <main>
      <HomeCarousel />

      <div className="w-full text-lg font-bold p-4">인기 프로젝트</div>

      <div className="grid grid-cols-4 gap-10 px-4">
        {projects.map((project, idx) => (
          <Link href={`/project/sell/${project.id}`} key={project.id}>
            <ProjectCard
              key={`${project.id}-${idx}`}
              hostName={project.hostName}
              thumbnail={project.thumbnail ?? "/images/sample-image.jpg"}
              title={project.title}
              sellingAmount={project.sellingAmount}
            />
          </Link>
        ))}
      </div>

      <div ref={loaderRef} className="py-10 text-center">
        {isLoading ? "로딩 중…" : hasMore ? "더 불러오는 중…" : <div></div>}
      </div>
    </main>
  );
}
