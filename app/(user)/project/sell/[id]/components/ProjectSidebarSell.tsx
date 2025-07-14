"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import type { Project } from "@/types/project/project";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  project: Project;
}

export default function ProjectSidebarSell({ project }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = project.purchaseOptions?.[selectedIndex];

  const totalPrice = selectedOption?.price.toLocaleString() ?? "0";

  return (
    <Card className="rounded-2xl shadow-sm border">
      <CardContent className="space-y-6">
        {project.purchaseOptions && project.purchaseOptions.length > 0 && (
          <div className="flex justify-between border-b">
            {project.purchaseOptions.map((opt, idx) => (
              <button
                key={opt.purchaseOptionId}
                className={`flex-1 text-center py-2 font-medium ${
                  selectedIndex === idx
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedIndex(idx)}
              >
                {opt.title}
              </button>
            ))}
          </div>
        )}

        {selectedOption && (
          <div className="space-y-3 text-gray-800">
            <div className="text-2xl font-bold">₩{totalPrice}</div>
            {selectedOption.content && (
              <div className="text-sm leading-relaxed whitespace-pre-line font-medium">
                {selectedOption.content}
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full bg-sky-500 hover:bg-sky-600 text-white"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          구매하기
        </Button>
      </CardContent>
    </Card>
  );
}
