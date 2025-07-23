"use client";

import type { ProductFormData } from "@/types/productFormData";

interface Props {
  formData: ProductFormData;
  onUpdate: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => void;
}

export default function DescriptionSection({ formData, onUpdate }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">제품 소개</h2>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        제품에 대한 자세한 설명을 입력하세요
      </label>
      <textarea
        id="description"
        rows={8}
        placeholder="예: 사용 방법, 특징, 유의 사항 등을 작성해주세요"
        value={formData.description}
        onChange={e => onUpdate("description", e.target.value as any)}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </div>
  );
}
