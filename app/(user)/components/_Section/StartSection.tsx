"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProjectTypeSelectorProps {
  onSelect: (type: "donation" | "sell") => void;
}

export default function StartSection({ onSelect }: ProjectTypeSelectorProps) {
  const [selected, setSelected] = useState<"donation" | "sell" | null>(null);

  const handleClick = (type: "donation" | "sell") => {
    setSelected(type);
    onSelect(type);
  };

  const baseCard =
    "group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border-2 p-8 transition-transform duration-500";
  const donationClasses =
    selected === "donation"
      ? "border-pink-500 scale-105 shadow-xl"
      : "border-pink-200 hover:border-pink-300 hover:-translate-y-2 hover:scale-105 shadow-lg";
  const sellClasses =
    selected === "sell"
      ? "border-purple-500 scale-105 shadow-xl"
      : "border-purple-200 hover:border-purple-300 hover:-translate-y-2 hover:scale-105 shadow-lg";

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="text-4xl">✨</span>
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              나만의 특별한 프로젝트를 시작해보세요!
            </h2>
            <span className="text-4xl">✨</span>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            멋진 아이디어가 있다면 지금 바로 시작해보세요!
            <br />
            후원받거나 완성된 서비스를 팔아보세요 💫
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            className={`${baseCard} ${donationClasses}`}
            onClick={() => handleClick("donation")}
          >
            <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
              💰
            </div>
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-4xl">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900">
                후원받기
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                멋진 아이디어가 있나요?
                <br />
                후원자들이 당신의 꿈을 응원해줄 거예요!
                <br />
                <span className="font-bold text-pink-600">
                  평균 3,200만원 받고 있어요 🎉
                </span>
              </p>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li>1️⃣ 프로젝트 등록하고 펀딩 시작</li>
                <li>2️⃣ 후원자들과 소통하며 진행</li>
                <li>3️⃣ 목표 달성하면 후원금 받기</li>
              </ul>
              <Link
                href="/project/new/donation"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-2xl transition-shadow duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span>후원 프로젝트 등록하기</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div
            className={`${baseCard} ${sellClasses}`}
            onClick={() => handleClick("sell")}
          >
            <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
              💎
            </div>
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-4xl">🛍️</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900">
                판매하기
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                완성된 서비스나 제품이 있나요?
                <br />
                전 세계 사람들에게 팔아보세요!
                <br />
                <span className="font-bold text-purple-600">
                  평균 15,000명이 이용하고 있어요 🎊
                </span>
              </p>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li>1️⃣ 제품 등록하고 상세 정보 작성</li>
                <li>2️⃣ 구매자 문의와 주문 관리</li>
                <li>3️⃣ 판매 수익 실시간 정산</li>
              </ul>
              <Link
                href="/project/new/sell"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl transition-shadow duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span>판매 프로젝트 등록하기</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
