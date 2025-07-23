"use client";

import React, { ChangeEvent } from "react";
import { Upload, Plus } from "lucide-react";
import Image from "next/image";

import type { ProductFormData } from "@/types/productFormData";

interface Props {
  formData: ProductFormData;
  onUpdate: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => void;
}

export default function ImageUploadSection({ formData, onUpdate }: Props) {
  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    isMain: boolean,
    index?: number,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    const updated = [...formData.images];

    const imageObj = { file, previewUrl };

    if (isMain) {
      updated[0] = imageObj;
    } else if (typeof index === "number" && index >= 0 && index < 3) {
      updated[index + 1] = imageObj;
    }

    onUpdate("images", updated.slice(0, 4) as any);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">이미지</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대표 이미지 *
          </label>
          <label className="block aspect-video border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors cursor-pointer relative">
            {formData.images[0]?.previewUrl ? (
              <Image
                src={formData.images[0].previewUrl}
                alt="대표 이미지"
                width={800}
                height={450}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <Upload className="w-8 h-8 mb-2" />
                <p className="text-gray-500">
                  클릭하여 대표 이미지를 업로드하세요
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageUpload(e, true)}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            추가 이미지
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(i => {
              const image = formData.images[i + 1];
              return (
                <label
                  key={i}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors relative"
                >
                  {image?.previewUrl ? (
                    <Image
                      src={image.previewUrl}
                      alt={`추가 이미지 ${i + 1}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleImageUpload(e, false, i)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
