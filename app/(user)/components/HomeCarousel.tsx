"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/sample-carousel-1.png",
    title: "창작물과 개발물에 투자하세요",
    subtitle: "노션 템플릿, 웹 서비스 등 다양한 프로젝트를 둘러보세요.",
  },
  {
    src: "/images/sample-carousel-2.png",
    title: "누구나 창작자나 개발자가 될 수 있습니다",
    subtitle: "당신의 아이디어를 실현하세요.",
  },
];

export default function HomeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const iv = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
      api.scrollNext();
    }, 4000);
    return () => clearInterval(iv);
  }, [api]);

  return (
    <div className="w-full h-64 relative overflow-hidden rounded-lg">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          <AnimatePresence initial={false}>
            {slides.map((slide, i) =>
              i === index ? (
                <CarouselItem
                  key={i}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.div
                    className="w-full h-full relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8">
                      <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                      <p className="text-sm">{slide.subtitle}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ) : null,
            )}
          </AnimatePresence>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
