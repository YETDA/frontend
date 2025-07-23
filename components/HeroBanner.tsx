"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const phrases = [
  "누구나 크리에이터가 될 수 있는 공간",
  "후원으로 키워가는 나만의 브랜드",
  "당신의 아이디어를 실현시켜보세요",
  "예따에서 만나요",
];
const highlights = ["후원", "나만의 브랜드", "크리에이터", "아이디어", "예따"];

export function HeroBanner() {
  const [idx, setIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % phrases.length);
        setFadeIn(true);
      }, 1000);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const renderPhrase = (phrase: string) => {
    const parts = phrase.split(new RegExp(`(${highlights.join("|")})`, "g"));
    return parts.map((part, i) =>
      highlights.includes(part) ? (
        <span key={i} className="text-[#00A4FF]">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  const handleSearch = () => {
    const q = keyword.trim();
    if (q.length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }
    router.push(`/search?keyword=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-[25vh] bg-white">
      <div
        className={`text-center space-y-6 px-4 transition-opacity duration-800 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold leading-snug">
          {renderPhrase(phrases[idx])}
        </h1>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="어떤 프로젝트를 찾으세요?"
            className="w-full h-12 pl-6 pr-12 rounded-full border-2 border-gray-300 focus:border-[#00A4FF] outline-none shadow-md transition"
          />
          <button
            onClick={handleSearch}
            aria-label="검색"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
