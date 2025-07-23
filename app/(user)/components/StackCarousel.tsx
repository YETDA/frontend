"use client";

import { useEffect, useState } from "react";

type StackCarouselProps = {
  images: string[];
  interval?: number; // ms
};

export default function StackCarousel({
  images,
  interval = 3000,
}: StackCarouselProps) {
  // 현재 맨 앞(보여질) 이미지의 인덱스
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  // 현재 보여줄 3장만 뽑기 (current, next1, next2)
  const front = images[current];
  const mid = images[(current + 1) % images.length];
  const back = images[(current + 2) % images.length];

  const layers = [
    { src: back, offsetX: 24, offsetY: 16, z: 0, opacity: 0.7 },
    { src: mid, offsetX: 12, offsetY: 8, z: 10, opacity: 0.85 },
    { src: front, offsetX: 0, offsetY: 0, z: 20, opacity: 1 },
  ];

  return (
    <div className="relative w-[330px] aspect-[165/158] mx-auto">
      {layers.map((layer, i) => (
        <img
          key={layer.src + i}
          src={layer.src}
          alt={`layer-${i}`}
          className={`
            absolute inset-0 w-full h-full object-cover rounded-md
            shadow-xl transition-all duration-500
          `}
          style={{
            transform: `translate(${layer.offsetX}px, ${layer.offsetY}px)`,
            zIndex: layer.z,
            opacity: layer.opacity,
          }}
        />
      ))}
    </div>
  );
}
