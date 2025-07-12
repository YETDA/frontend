// app/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchResultApi } from "@/app/api/search/api"; // 경로는 실제 위치에 맞춰 조정
import ProjectCard from "../components/ProjectCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const [projects, setProjects] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 키워드가 2글자 미만이면 호출하지 않음
    if (keyword.length < 2) {
      setProjects([]);
      setTotalCount(0);
      setError(null);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchResultApi(keyword);
        console.log("search API 응답:", res);
        // API 리턴 형태가 { timestamp, statusCode, message, data: { content, totalElements, … } }
        const wrapper = res;
        const body = wrapper.data;
        setProjects(body.content || []);
        setTotalCount(body.totalElements || body.content.length);
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [keyword]);

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      {/* 검색어 길이에 따라 안내 문구 */}
      {keyword.length < 2 ? (
        <p className="mt-4 text-gray-500">
          검색어를 최소 2글자 이상 입력해주세요.
        </p>
      ) : loading ? (
        <p className="mt-4">검색 중…</p>
      ) : error ? (
        <p className="mt-4 text-red-500">에러 발생: {error}</p>
      ) : (
        <div className="w-full flex justify-start items-center mb-4">
          {totalCount}개의 검색결과가 있습니다.
        </div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {projects.map(proj => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
}
