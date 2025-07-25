"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { ProductFormData } from "@/types/productFormData";

import DescriptionSection from "./DescriptionSection";
import ImageUploadSection from "./ImageUploadSection";
import OptionListSection from "./OptionListSection";
import ProductFormSection from "./ProductFormSection";
import ProductPreviewPanel from "./ProductPreviewPanel";

interface Props {
  initialFormData: ProductFormData;
  onSubmit: (
    formData: ProductFormData,
    planType: "BASIC" | "PRO",
  ) => void | Promise<void>;
  submitButtonLabel?: string;
}

export default function SellProjectEditor({
  initialFormData,
  onSubmit,
  submitButtonLabel = "등록하기",
}: Props) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [planType, setPlanType] = useState<"BASIC" | "PRO">("BASIC");

  const updateFormData = (field: keyof ProductFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData, planType);
    } catch (err) {
      console.error(err);
      alert("작업 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-8">
        <Link
          href="/project/new"
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-semibold">판매 프로젝트</span>
        </Link>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {submitButtonLabel}
        </button>
      </header>

      <p className="text-center text-gray-600 mb-6">
        요금제와 옵션을 선택한 뒤 실시간 미리보기를 확인하세요
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {[
          { key: "BASIC", label: "베이직", fee: "수수료 4%" },
          { key: "PRO", label: "프로", fee: "수수료 10%" },
        ].map(plan => (
          <button
            key={plan.key}
            type="button"
            onClick={() => setPlanType(plan.key as "BASIC" | "PRO")}
            className={
              `w-40 p-4 border rounded-lg flex flex-col items-center transition ` +
              (planType === plan.key
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-300 bg-white hover:bg-gray-100")
            }
          >
            <span className="text-lg font-medium text-gray-800">
              {plan.label}
            </span>
            <span className="text-sm text-gray-600 mt-1">{plan.fee}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ProductFormSection formData={formData} onUpdate={updateFormData} />
          <ImageUploadSection formData={formData} onUpdate={updateFormData} />
          <DescriptionSection formData={formData} onUpdate={updateFormData} />
          <OptionListSection formData={formData} onUpdate={updateFormData} />
        </div>

        <ProductPreviewPanel formData={formData} />
      </div>
    </div>
  );
}
