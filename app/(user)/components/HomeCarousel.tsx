"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HomeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    const startAutoScroll = () => {
      timerRef.current = setTimeout(() => {
        api.scrollNext();
        startAutoScroll();
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [api]);

  return (
    <div className="w-full h-[400px]">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          <CarouselItem className="w-full relative h-[400px]">
            <Image
              src="/images/sample-carousel-1.png"
              width={1280}
              height={400}
              alt="창작물 소개 이미지 1"
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8">
              <h2 className="text-2xl font-bold mb-2">
                창작물과 개발물에 투자하세요
              </h2>
              <p className="text-sm">
                노션 템플릿, 웹 서비스 등 다양한 프로젝트를 둘러보세요.
              </p>
            </div>
          </CarouselItem>

          <CarouselItem className="w-full relative h-[400px]">
            <Image
              src="/images/sample-carousel-2.png"
              width={1280}
              height={400}
              alt="창작물 소개 이미지 2"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8">
              <h2 className="text-2xl font-bold mb-2">
                누구나 창작자가 될 수 있습니다
              </h2>
              <p className="text-sm">당신의 아이디어를 실현해보세요.</p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
