"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  urls: string[];
  title: string;
}

export default function ImageGallery({ urls, title }: Props) {
  const [idx, setIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group">
        <Image
          src={urls[idx]}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform transform group-hover:scale-105 cursor-zoom-in"
          onClick={() => setModalOpen(true)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white"
        >
          <Expand className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex space-x-3 overflow-x-auto">
        {urls.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              idx === i
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image
              src={src}
              alt={`썸네일 ${i + 1}`}
              width={80}
              height={80}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <Image
              src={urls[idx]}
              alt={title}
              width={800}
              height={600}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />

            <button
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="absolute left-2 top-1/2 bg-white/90 p-2 rounded-full disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => setIdx(i => Math.min(urls.length - 1, i + 1))}
              disabled={idx === urls.length - 1}
              className="absolute right-2 top-1/2 bg-white/90 p-2 rounded-full disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
