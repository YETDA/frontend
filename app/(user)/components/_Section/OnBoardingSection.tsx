"use client";

import OnboardingCard from "../OnboardingCard";

type OnboardingItem = {
  id: string;
  title: string;
  desc: string;
  lottie: string;
};

const ITEMS: OnboardingItem[] = [
  {
    id: "find",
    title: "프로젝트를 찾고",
    desc: "내가 원하는 프로젝트를\n자유롭게 검색할 수 있어요",
    lottie: "/lottie/Search.lottie",
  },
  {
    id: "talk",
    title: "크리에이터와 소통하고",
    desc: "궁금한 점이 있다면\n구매 하기 전 문의할 수 있어요",
    lottie: "/lottie/Conversation.lottie",
  },
  {
    id: "safe",
    title: "안전하게 펀딩하고",
    desc: "에스크로 결제로 작업물을 받을 때 까지\n거래 대금을 안전하게 보호받아요",
    lottie: "/lottie/Secure.lottie",
  },
  {
    id: "reward",
    title: "원하는 리워드를 받아요",
    desc: "검증된 고퀄리티 작업물을\n제공받을 수 있어요",
    lottie: "/lottie/Download.lottie",
  },
];

export default function OnboardingSection() {
  return (
    <section className="w-full py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 leading-tight">
        누구나, 언제나, 어디서나 예따
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 max-w-6xl mx-auto">
        {ITEMS.map(item => (
          <OnboardingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
