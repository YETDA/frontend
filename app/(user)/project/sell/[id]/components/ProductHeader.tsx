"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Heart } from "lucide-react";

interface Category {
  id: string;
  icon: string;
  name: string;
}

interface Props {
  liked: boolean;
  onToggleLike: () => void;
  category?: Category;
}

export default function ProductHeader({
  liked,
  onToggleLike,
  category,
}: Props) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() =>
            category
              ? router.push(`/project/list/${category.id}`)
              : router.back()
          }
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {category && (
          <span className="inline-block text-base text-gray-800">
            {category.icon} {category.name}
          </span>
        )}
      </div>
      <div className="flex space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <Share2 className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleLike}
          className={`p-2 rounded-full ${
            liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>
    </header>
  );
}
