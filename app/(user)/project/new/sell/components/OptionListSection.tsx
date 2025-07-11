"use client";

import { Plus, X } from "lucide-react";

import type { ProductFormData } from "@/types/productFormData";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      { name: "", price: "", description: "" },
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">옵션 설정</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddOption}
            disabled={formData.options.length >= MAX_OPTIONS}
            className={
              formData.options.length >= MAX_OPTIONS
                ? "cursor-not-allowed opacity-50"
                : ""
            }
          >
            <Plus className="w-4 h-4 mr-1" />
            옵션 추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {formData.options.map((option, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-6 space-y-5"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-base font-medium text-gray-800">
                옵션 {index + 1}
              </h4>
              {formData.options.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveOption(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">옵션명</Label>
                <Input
                  value={option.name}
                  onChange={e => handleChange(index, "name", e.target.value)}
                  placeholder="예: STANDARD"
                />
              </div>
              <div>
                <Label className="mb-1 block">추가 가격</Label>
                <Input
                  value={option.price}
                  onChange={e => handleChange(index, "price", e.target.value)}
                  placeholder="예: 5000"
                />
              </div>
            </div>

            <div>
              <Label className="mb-1 block">설명</Label>
              <Input
                value={option.description}
                onChange={e =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="예: 기본 옵션 설명"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
