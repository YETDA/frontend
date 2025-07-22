"use client";

import React, { ChangeEvent } from "react";
import { Plus, X } from "lucide-react";
import type { ProductFormData } from "@/types/productFormData";

const MAX_OPTIONS = 3;

interface Props {
  formData: ProductFormData;
  onUpdate: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => void;
}

export default function OptionListSection({ formData, onUpdate }: Props) {
  const handleAddOption = () => {
    onUpdate("options", [
      ...formData.options,
      {
        name: "",
        price: "",
        description: "",
        file: undefined,
        deliveryMethod: "FILE_UPLOAD",
      },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    onUpdate(
      "options",
      formData.options.filter((_, i) => i !== index),
    );
  };

  const handleChange = (
    index: number,
    field: "name" | "price" | "description",
    value: string,
  ) => {
    const updated = formData.options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : opt,
    );
    onUpdate("options", updated);
  };

  const handleFileChange = (index: number, file: File) => {
    const updated = formData.options.map((opt, i) =>
      i === index ? { ...opt, file } : opt,
    );
    onUpdate("options", updated);
  };

  const handleChangeDeliveryMethod = (
    index: number,
    method: "FILE_UPLOAD" | "EMAIL_SEND",
  ) => {
    const updated = formData.options.map((opt, i) =>
      i === index ? { ...opt, deliveryMethod: method } : opt,
    );
    onUpdate("options", updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">옵션 설정</h2>
        <button
          type="button"
          onClick={handleAddOption}
          disabled={formData.options.length >= MAX_OPTIONS}
          className={`flex items-center px-3 py-1 rounded-lg text-sm transition ${
            formData.options.length >= MAX_OPTIONS
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus className="w-4 h-4 mr-1" />
          옵션 추가
        </button>
      </div>

      <div className="space-y-6">
        {formData.options.map((option, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-6 space-y-5"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">옵션 {index + 1}</h3>
              {formData.options.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                전달 방식
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={option.deliveryMethod === "FILE_UPLOAD"}
                    onChange={() =>
                      handleChangeDeliveryMethod(index, "FILE_UPLOAD")
                    }
                    className="text-blue-600"
                  />
                  <span>파일 업로드</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={option.deliveryMethod === "EMAIL_SEND"}
                    onChange={() =>
                      handleChangeDeliveryMethod(index, "EMAIL_SEND")
                    }
                    className="text-blue-600"
                  />
                  <span>메일 전송</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  옵션명
                </label>
                <input
                  type="text"
                  value={option.name}
                  onChange={e => handleChange(index, "name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: STANDARD"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  추가 가격
                </label>
                <input
                  type="number"
                  value={option.price}
                  onChange={e => handleChange(index, "price", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 5000"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                설명
              </label>
              <input
                type="text"
                value={option.description}
                onChange={e =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="예: 기본 옵션 설명"
              />
            </div>

            {option.deliveryMethod === "FILE_UPLOAD" && (
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  첨부 파일 (선택)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(index, file);
                    }}
                    className="block"
                  />
                  {option.file && (
                    <span className="text-sm text-gray-600">
                      {option.file.name}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
