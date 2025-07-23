import { Search } from "lucide-react";
import StackCarousel from "../StackCarousel";

export default function MainSection() {
  return (
    <div className="w-full h-[316px] flex justify-between items-center">
      {/* 타이틀 / 검색바 부분 */}
      <div className="flex flex-col max-w-[627px] h-[63px] justify-center items-center gap-3">
        <div className="text-[40px] font-bold">
          누구나 크리에이터가 가능한,
          <br />
          펀딩으로 키워가는 나만의 브랜드
        </div>
        <div className="relative w-full">
          <input
            placeholder="어떤 브랜드를 찾으세요?"
            className="
              w-full h-16 rounded-full bg-white px-8 py-4 text-gray-600
              shadow-[0_20px_40px_rgba(0,0,0,0.08)]
              focus:shadow-[0_24px_48px_rgba(0,0,0,0.12)]
              outline-none transition-shadow
            "
          />
          <Search
            className="absolute right-6 top-1/2 -translate-y-1/2"
            size={24}
          />
        </div>
      </div>
      {/* 사진 넘어가는 부분 */}
      <div>
        <StackCarousel
          images={[
            "/sample/1.png",
            "/sample/2.png",
            "/sample/3.png",
            "/sample/4.png",
            "/sample/5.png",
          ]}
          interval={1000}
        />
      </div>
    </div>
  );
}
