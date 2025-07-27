"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Clock, Users, DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getDonationProjectById } from "@/apis/donation";
import { DonationProject } from "@/types/project/donation";

export default function ProjectDetail() {
  const { searchParams } = new URL(window.location.href);
  const projectId = searchParams.get("projectId")!;

  const [project, setProject] = useState<DonationProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      const dto = await getDonationProjectById(projectId);
      setProject(dto as DonationProject);
      setLoading(false);
    })();
  }, [projectId]);

  if (loading) return <p className="text-center py-20">로딩 중…</p>;
  if (!project)
    return <p className="text-center py-20">프로젝트를 찾을 수 없습니다.</p>;

  const daysLeft = (() => {
    const end = new Date(project.projectEndDate);
    const diff = Math.ceil((end.getTime() - Date.now()) / 86400000);
    return Math.max(0, diff);
  })();

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> 뒤로가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src={project.contentImageUrls[0] || "/images/placeholder.png"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="mt-2 text-gray-600">{project.content}</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Users className="w-5 h-5 text-[#00A4FF]" />
              <span>{project.followerCount}명 팔로워</span>
              <Heart className="w-5 h-5 text-[#FF4D7A]" />
              <span>{project.projectCount}번 후원됨</span>
            </div>
            <Card>
              <CardContent>
                <h2 className="text-2xl font-bold mb-4">리워드 선택</h2>
                <div className="space-y-4">
                  {project.purchaseOptions.map(opt => (
                    <label
                      key={opt.purchaseOptionId}
                      className={`block p-4 border rounded-lg cursor-pointer ${
                        selectedOptionId === opt.purchaseOptionId
                          ? "border-[#00A4FF] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reward"
                        className="sr-only"
                        checked={selectedOptionId === opt.purchaseOptionId}
                        onChange={() =>
                          setSelectedOptionId(opt.purchaseOptionId)
                        }
                      />
                      <div className="flex justify-between">
                        <span className="font-semibold">{opt.title}</span>
                        <span className="text-[#00A4FF] font-semibold">
                          {opt.price.toLocaleString()}원
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{opt.content}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        제공 방식: {opt.providingMethod}
                      </p>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">후원하기</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#00A4FF]">
                    {project.projectCount.toLocaleString()}원
                  </div>
                  <div className="text-gray-600">총 후원액</div>
                </div>
                <Button
                  onClick={openConfirm}
                  disabled={selectedOptionId === null}
                  className="w-full bg-[#00A4FF] hover:bg-blue-700 text-white mb-4"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  후원하기
                </Button>
                <div className="flex items-center justify-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{daysLeft}일 남음</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h4 className="text-lg font-bold mb-4">후원 확인</h4>
            <p className="text-gray-600 mb-6">
              선택하신 리워드로 후원하시겠습니까?
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={closeConfirm}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  /* 결제 로직 호출 */
                }}
                className="flex-1 bg-[#00A4FF] text-white"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
