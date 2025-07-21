"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { popularProjectApi } from "@/apis/popular-project/api";

import HomeCarousel from "./components/HomeCarousel";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 로그인 유지를 위해 유효시간 설정해뒀습니다!
      document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      router.replace("/");
    }
  }, [searchParams, router]);

  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    try {
      const data = await popularProjectApi(page, 20);
      console.log("Popular projects:", data);
      setProjects(prev => [...prev, ...data.content]);
      setPage(prev => prev + 1);
      setHasMore(!data.last);
    } catch (err) {
      console.error("인기 프로젝트 조회 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);
}
