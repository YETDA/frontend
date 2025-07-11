"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { ProductFormData } from "@/types/productFormData";

import { Button } from "@/components/ui/button";

import DescriptionSection from "./components/DescriptionSection";
import ImageUploadSection from "./components/ImageUploadSection";
import OptionListSection from "./components/OptionListSection";
import ProductFormSection from "./components/ProductFormSection";
import ProductPreviewPanel from "./components/ProductPreviewPanel";

export default function SellProjectPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    price: "",
    images: [],
    options: [{ name: "STANDARD", price: "0", description: "" }],
    creatorName: "",
    creatorBio: "",
    creatorAvatar: "",
  });

  const updateFormData = (field: keyof ProductFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 max-w-full">
            <Link href="/project/new" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">판매 등록</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button className="bg-sky-500 hover:bg-sky-600">등록하기</Button>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-center">
                오른쪽에서 실시간 미리보기를 확인하세요
              </p>
            </div>

            <ProductFormSection formData={formData} onUpdate={updateFormData} />
            <ImageUploadSection formData={formData} onUpdate={updateFormData} />

            <DescriptionSection formData={formData} onUpdate={updateFormData} />
            <OptionListSection formData={formData} onUpdate={updateFormData} />
          </div>
          <ProductPreviewPanel formData={formData} />
        </div>
      </div>
    </div>
  );
}
