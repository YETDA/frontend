"use client";

import DotLottie from "@/components/common/DotLottie";

type OnboardingItem = {
  id: string;
  title: string;
  desc: string;
  lottie: string;
};

export default function OnboardingCard({ item }: { item: OnboardingItem }) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className="w-40 h-40">
        <DotLottie
          src={item.lottie}
          autoplay={true}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h3 className="text-lg font-semibold whitespace-pre-line">
        {item.title}
      </h3>
      <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
}
