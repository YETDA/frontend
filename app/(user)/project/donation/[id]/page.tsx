"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Github,
  Globe,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { defaultProject, ProjectDetailData } from "./default";

export default function ProjectDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { id: projectId } = useParams(); // useParams로 projectId 가져오기
  const [project, setProject] = useState<ProjectDetailData | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", projectId); // 디버깅용 로그
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/${projectId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: { data: ProjectDetailData } = await response.json(); // API 응답 데이터 타입 지정
        console.log("Fetched project data:", data.data); // API 데이터 출력
        setProject(data.data);
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (!project) {
    return <div className="text-center py-20">로딩 중...</div>;
  }

  const getDaysLeft = (endDate: string | undefined) => {
    const now = new Date();
    const end = new Date(endDate ?? "");
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleSupport = () => {
    setShowSupportModal(true);
  };

  const handleConfirmSupport = () => {
    setShowSupportModal(false);
    // 여기에 실제 결제 로직을 구현
    console.log("Supporting with reward:", selectedReward);
    // 결제 완료 후 성공 모달 표시
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleCancelSupport = () => {
    setShowSupportModal(false);
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "날짜 정보 없음"; // 기본 메시지
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "유효하지 않은 날짜"; // 유효하지 않은 날짜 처리
    return date.toLocaleDateString(); // 유효한 날짜를 로컬 형식으로 반환
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 프로젝트 이미지 */}
            <Card className="overflow-hidden">
              <img
                src={
                  project.contentImageUrls?.[0] ||
                  "/placeholder.svg?height=384&width=832&query=AI+learning+app"
                }
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </Card>

            {/* 프로젝트 정보 */}
            <Card>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {project?.title || defaultProject.title}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {project?.introduce || defaultProject.introduce}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`rounded-full ${
                        isLiked
                          ? "text-red-500 bg-red-50"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-gray-400 hover:text-gray-600"
                    >
                      <Share2 className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                {/* 창작자 정보 */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        project?.userProfileImage ||
                        defaultProject.userProfileImage
                      }
                      alt={project?.name || defaultProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {project?.name || defaultProject.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      팔로워{" "}
                      {project?.followerCount || defaultProject.followerCount}명
                    </p>
                  </div>
                </div>

                {/* 총 후원액 */}
                <div className="mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {project?.currentFunding ?? defaultProject.currentFunding}
                      원
                    </div>
                    <div className="text-gray-600">총 후원액</div>
                  </div>
                </div>

                {/* 프로젝트 상세 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>
                      {getDaysLeft(project?.endDate || defaultProject.endDate)}
                      일 남음
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>
                      후원자{" "}
                      {project?.followerCount || defaultProject.followerCount}명
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {formatDate(
                        project?.startDate || defaultProject.startDate,
                      )}{" "}
                      - {formatDate(project?.endDate || defaultProject.endDate)}
                    </span>
                  </div>
                </div>

                {/* 로드맵 */}
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      로드맵
                    </h2>
                    <div className="space-y-6">
                      {project?.roadmap?.map(
                        (
                          step: {
                            title: string;
                            date: string;
                            description: string;
                          },
                          index: number,
                        ) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {step.date}
                              </p>
                              <p className="text-gray-600">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        ),
                      ) || (
                        <p className="text-gray-600">로드맵 정보가 없습니다.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 리워드 선택 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    리워드 선택
                  </h4>
                  <div className="space-y-3">
                    {project?.rewards?.map(reward => (
                      <label
                        key={reward.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedReward === reward.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reward"
                          value={reward.id}
                          checked={selectedReward === reward.id}
                          onChange={e => setSelectedReward(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-gray-900">
                            {reward.name}
                          </h5>
                          <span className="text-blue-600 font-semibold">
                            {reward.amount.toLocaleString()}원
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {reward.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>제공 방식: {reward.deliveryMethod}</span>
                          <span>
                            {reward.currentQuantity}/{reward.maxQuantity} 남음
                          </span>
                        </div>
                      </label>
                    )) || (
                      <p className="text-gray-600">리워드 정보가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* 후원 버튼 */}
                <Button
                  onClick={handleSupport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  500원 후원하기
                </Button>

                {/* 남은 시간 */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {getDaysLeft(project.endDate ?? defaultProject.endDate)}일
                      남음
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            {/* 후원 카드 */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  후원하기
                </h3>

                {/* 총 후원액 */}
                <div className="mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {project.currentFunding ?? defaultProject.currentFunding}
                      원
                    </div>
                    <div className="text-gray-600">총 후원액</div>
                  </div>
                </div>

                {/* 리워드 선택 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    리워드 선택
                  </h4>
                  <div className="space-y-3">
                    {project?.rewards?.map(reward => (
                      <label
                        key={reward.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedReward === reward.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reward"
                          value={reward.id}
                          checked={selectedReward === reward.id}
                          onChange={e => setSelectedReward(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-gray-900">
                            {reward.name}
                          </h5>
                          <span className="text-blue-600 font-semibold">
                            {reward.amount.toLocaleString()}원
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {reward.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>제공 방식: {reward.deliveryMethod}</span>
                          <span>
                            {reward.currentQuantity}/{reward.maxQuantity} 남음
                          </span>
                        </div>
                      </label>
                    )) || (
                      <p className="text-gray-600">리워드 정보가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* 후원 버튼 */}
                <Button
                  onClick={handleSupport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  500원 후원하기
                </Button>

                {/* 남은 시간 */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {getDaysLeft(project.endDate)}일 남음
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 후원 확인 모달 */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              {/* 경고 아이콘 */}
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                후원 확인
              </h3>

              <div className="text-gray-600 mb-6 space-y-3">
                <p className="font-semibold text-red-600">
                  "후원은 환불되지 않아요"
                </p>
                <p className="text-sm leading-relaxed">
                  후원금 500원은 창작자의 도전을 응원하는 의미로 사용되며, 즉시
                  결제 처리됩니다. 리워드는 응원의 증표로 제공되며, 교환/환불은
                  불가합니다.
                </p>
              </div>

              {/* 선택된 리워드 표시 */}
              {selectedReward && (
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    선택된 리워드
                  </h4>
                  <div className="text-sm text-blue-600">
                    {project.rewards?.find(r => r.id === selectedReward)?.name}
                  </div>
                </div>
              )}

              {/* 버튼 그룹 */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleCancelSupport}
                  variant="outline"
                  className="flex-1 rounded-2xl bg-transparent"
                >
                  더 고민해볼게요
                </Button>
                <Button
                  onClick={handleConfirmSupport}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-2xl font-semibold text-white"
                >
                  네!(결제창 넘김)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 후원 완료 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              {/* 성공 아이콘 */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎉</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                후원 완료!
              </h3>

              <div className="text-gray-600 mb-6">
                <p className="mb-3">
                  <span className="font-bold text-blue-600">500원</span> 후원이
                  완료되었습니다.
                </p>
                <p className="text-sm">
                  창작자의 도전을 응원해주셔서 감사합니다! 리워드는 이메일로
                  발송됩니다.
                </p>
              </div>

              {/* 프로젝트 정보 */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  후원한 프로젝트
                </h4>
                <div className="text-sm text-gray-600">{project.title}</div>
              </div>

              {/* 버튼 */}
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 rounded-2xl font-semibold text-white"
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
