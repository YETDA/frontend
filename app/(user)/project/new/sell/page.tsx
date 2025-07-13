"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ProductFormData } from "@/types/productFormData";

import { createPurchaseProject } from "@/app/api/project";
import { Button } from "@/components/ui/button";

import DescriptionSection from "./components/DescriptionSection";
import ImageUploadSection from "./components/ImageUploadSection";
import OptionListSection from "./components/OptionListSection";
import ProductFormSection from "./components/ProductFormSection";
import ProductPreviewPanel from "./components/ProductPreviewPanel";
export default function SellProjectPage() {
  const router = useRouter();
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
  const handleSubmit = async () => {
    try {
      const form = new FormData();

      const requestDto = {
        projectType: "PURCHASE",
        title: formData.title,
        introduce: formData.subtitle,
        content: formData.description,
        field: formData.category,
        pricingPlanId: 3,
        purchaseDetail: {
          gitAddress: "",
          purchaseCategoryId: 1,
          getAverageDeliveryTime: "즉시 다운로드 및 24시간 이내 이메일 발송",
          purchaseOptionList: formData.options.map(option => ({
            providingMethod: option.name === "STANDARD" ? "DOWNLOAD" : "EMAIL",
            title: option.name,
            content: option.description,
            price: Number(option.price),
            optionStatus: "AVAILABLE",
            ...(option.name === "STANDARD" && {
              fileIdentifier: "기본템플릿.pdf",
            }),
          })),
        },
      };

      form.append("requestDto", JSON.stringify(requestDto));
      if (formData.images[0]) {
        form.append("contentImage", formData.images[0].file);
      }

      const downloadOption = formData.options.find(o => o.name === "STANDARD");
      if (downloadOption?.file) {
        form.append("optionFiles", downloadOption.file, "기본템플릿.pdf");
      }

      const res = await createPurchaseProject(form);
      const result = await res.json();
      const projectId = result?.data?.projectId;

      if (!projectId) throw new Error("프로젝트 ID가 반환되지 않았습니다.");

      alert("등록 완료");
      router.push(`/project/sell/${projectId}`);
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
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
              <Button
                className="bg-sky-500 hover:bg-sky-600"
                onClick={handleSubmit}
              >
                등록하기
              </Button>
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
