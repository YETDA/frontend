"use client";

import React from "react";
import { DollarSign } from "lucide-react";
import type { ProductFormData } from "@/types/productFormData";

interface Props {
  formData: ProductFormData;
  onUpdate: (field: keyof ProductFormData, value: unknown) => void;
}

const categories = [
  { id: "app", name: "앱/서비스", icon: "📱" },
  { id: "notion", name: "Notion 템플릿", icon: "📝" },
  { id: "slide", name: "슬라이드/제안서", icon: "📊" },
  { id: "automation", name: "자동화 툴", icon: "⚙️" },
  { id: "design", name: "디자인 리소스", icon: "🎨" },
];

export default function ProductFormSection({ formData, onUpdate }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">제품 등록</h2>

      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          제품명 *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={e => onUpdate("title", e.target.value)}
          placeholder="예: AI 양말"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="subtitle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          한 줄 소개 *
        </label>
        <input
          id="subtitle"
          type="text"
          value={formData.subtitle}
          onChange={e => onUpdate("subtitle", e.target.value)}
          placeholder="간단한 제품 설명을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리 *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onUpdate("category", cat.id)}
              className={`flex items-center p-4 border rounded-lg transition ${
                formData.category === cat.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <span className="text-2xl mr-3">{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          가격 *
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={e => onUpdate("price", e.target.value)}
            placeholder="15000"
            min={0}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            원
          </span>
        </div>
      </div>
    </div>
  );
}
