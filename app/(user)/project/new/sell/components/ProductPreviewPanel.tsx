"use client";

import React, { useState } from "react";
import { Upload, User, ShoppingCart, MessageCircle } from "lucide-react";
import Image from "next/image";
import type { ProductFormData } from "@/types/productFormData";

const categoryLabels: Record<string, string> = {
  app: "앱/서비스",
  notion: "Notion 템플릿",
  slide: "슬라이드/제안서",
  automation: "자동화 툴",
  design: "디자인 리소스",
};

interface Props {
  formData: ProductFormData;
}

export default function ProductPreviewPanel({ formData }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const basePrice = Number(formData.price || 0);
  const selectedOption = formData.options[selectedIndex];
  const optionPrice = Number(selectedOption?.price || 0);
  const totalPrice = basePrice + optionPrice;

  const getImageUrl = (i: number) => formData.images[i]?.previewUrl || null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 sticky top-24 h-fit space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-sky-500">미리보기</h2>
      </div>

      <div className="space-y-2 break-words">
        {formData.category && (
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {categoryLabels[formData.category] || "카테고리"}
          </span>
        )}
        <h1 className="text-xl font-bold break-words">
          {formData.title || "제품명을 입력하세요"}
        </h1>
        <p className="text-gray-600 break-words">
          {formData.subtitle || "한 줄 소개를 입력하세요"}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
          {formData.creatorAvatar ? (
            <Image
              src={formData.creatorAvatar}
              alt="avatar"
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-500 m-auto" />
          )}
        </div>
        <div>
          <div className="font-medium text-sm">
            {formData.creatorName || "크리에이터"}
          </div>
          <div className="text-xs text-gray-500">팔로워 ?명</div>
        </div>
      </div>

      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
        {mainImage || getImageUrl(0) ? (
          <Image
            src={mainImage || getImageUrl(0)!}
            alt="대표 이미지"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Upload className="w-8 h-8 mb-2" />
            <p>대표 이미지</p>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {formData.images.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative"
            onClick={() => setMainImage(img.previewUrl)}
          >
            <Image
              src={img.previewUrl}
              alt={`썸네일 ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 whitespace-pre-wrap break-words min-h-[80px]">
          {formData.description || "제품 소개을 입력하세요..."}
        </p>
      </div>

      {formData.options.length > 0 && (
        <div className="space-y-2">
          <div className="flex border-b">
            {formData.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`flex-1 py-2 text-sm ${
                  selectedIndex === idx
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-400"
                } break-words`}
              >
                {opt.name || `옵션 ${idx + 1}`}
              </button>
            ))}
          </div>
          <div className="space-y-1 text-gray-800">
            <div className="text-xl font-bold">
              ₩{totalPrice.toLocaleString()}
            </div>
            {selectedOption?.description && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {selectedOption.description}
              </p>
            )}
          </div>
        </div>
      )}

      <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg">
        <ShoppingCart className="w-5 h-5" />
        <span>구매하기</span>
      </button>

      <div className="border-t pt-4 space-y-3">
        <h3 className="font-semibold">창작자 정보</h3>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
            {formData.creatorAvatar ? (
              <Image
                src={formData.creatorAvatar}
                alt="avatar"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-500 m-auto" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="font-medium">
              {formData.creatorName || "크리에이터"}
            </div>
            <p className="text-sm text-gray-600">
              {formData.creatorBio || "소개글을 입력하세요"}
            </p>
            <div className="flex space-x-2 mt-2">
              <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg">
                팔로우
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
                <MessageCircle className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
