"use client";

import React from "react";

interface Props {
  content: string;
}

export default function DescriptionCard({ content }: Props) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">제품 소개</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
