import {
  User,
  Edit3,
  Heart,
  FileText,
  DollarSign,
  Settings,
  MessageSquare,
  ShoppingBag,
  Bell,
  Star,
  Mail,
} from "lucide-react";
import React, { useState } from "react";
import { useFollowCount } from "@/apis/my/useFollowCount";
import { Button } from "@/components/ui/button";
import { TabBar } from "./TabBar";
import MyProjectCard from "./ui/MyProjectCard";
import { GithubBadge } from "./GithubBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/MyTooltip";
import { useUserOrderList } from "@/apis/my/useUserOrderList";
import MySettlement from "./ui/MySettlement";
import { useSettlement } from "@/apis/my/useSettlement";
import { TotalSettlementCard } from "./TotalSettlement";

type UserType = "creator" | "supporter";

export interface User {
  name: string;
  email?: string;
  portfolioAddress?: string;
  image?: string;
  introduce?: string;
  followers?: number;
  following?: number;
}

interface ProfileProps {
  user: User;
  onEditClick: (isEditing: boolean) => void;
}

export function Profile({ user, onEditClick }: ProfileProps) {
  const [userType, setUserType] = useState<UserType>("creator");
  const followData = useFollowCount();
  // 사용자가 구매한 프로젝트 리스트 useUserOrderList
  const userOrderList = useUserOrderList();
  // 사용자가 올린 프로젝트 정산 리스트
  const userSettlement = useSettlement();
  const creatorTabs = [
    {
      value: "심사 현황",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="flex flex-row justify-center">
          {userSettlement?.content?.map((project: any, index: number) => (
            <MySettlement
              key={`${index}`}
              project={{
                id: project.index,
                title: project.projectTitle,
                periodStart: project.periodStart,
                periodEnd: project.periodEnd,
                payoutAmount: project.payoutAmount,
                feeAmount: project.feeAmount,
                totalOrderAmount: project.totalOrderAmount,
                settlementStatus: project.settlementStatus,
                contentImageUrls:
                  project.projectImageUrls || "/images/sample-image.jpg",
              }}
            />
          ))}
        </div>
      ),
    },
    {
      value: "정산",
      icon: <DollarSign className="h-4 w-4" />,
      content: (
        // 21 - 20 총 누적된 정산 내역
        <TotalSettlementCard />
      ),
    },
    {
      value: "프로젝트 관리",
      icon: <Settings className="h-4 w-4" />,
      content: <div>등록한 프로젝트 관리 내용</div>,
    },
  ];

  const supporterTabs = [
    {
      value: "후원 내역",
      icon: <Heart className="h-4 w-4" />,
      // 후원한 프로젝트 api는 아직 없으므로 구매한 프로젝트 api를 활용하여 나타냈습니다.
      content: (
        <div className="flex flex-row justify-center">
          {userOrderList?.content?.map((project: any, index: number) => (
            <MyProjectCard
              key={`${project.id}-${index}`}
              project={{
                id: project.id,
                title: project.title,
                sellCount: project.sellCount,
                projectStatus: project.projectStatus,
                contentImageUrls:
                  project.contentImageUrls?.[0] || "/images/sample-image.jpg",
                hostName: project.hostName ?? "아직 모름",
              }}
            />
          ))}
        </div>
      ),
    },
    {
      value: "구매 내역",
      icon: <ShoppingBag className="h-4 w-4" />,
      content: (
        <div className="flex flex-row justify-center">
          {userOrderList?.content?.map((project: any, index: number) => (
            <MyProjectCard
              key={`${project.projectId}-${index}`}
              project={{
                id: project.projectId,
                title: project.title,
                sellCount: project.sellCount,
                projectStatus: project.projectStatus,
                contentImageUrls:
                  project.contentImageUrls?.[0] || "/images/sample-image.jpg",
                hostName: project.hostName ?? "아직 모름",
              }}
            />
          ))}
        </div>
      ),
    },
    {
      value: "Q&A",
      icon: <MessageSquare className="h-4 w-4" />,
      content: <div>Q&A 내용</div>,
    },
    {
      value: "후기",
      icon: <Star className="h-4 w-4" />,
      content: <div>후기 내용</div>,
    },
    {
      value: "알림",
      icon: <Bell className="h-4 w-4" />,
      content: <div>알림 내용</div>,
    },
  ];

  const tabs = userType === "creator" ? creatorTabs : supporterTabs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            마이페이지
          </h1>
          <p className="text-secondary-600">
            내 활동과 프로젝트를 관리해보세요
          </p>
        </div>

        {/* 사용자 타입 선택 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex bg-secondary-100 rounded-2xl p-1">
            <button
              onClick={() => setUserType("creator")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "creator"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              창작자
            </button>
            <button
              onClick={() => setUserType("supporter")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "supporter"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              <Heart className="h-4 w-4 inline mr-2" />
              후원자
            </button>
          </div>
        </div>

        {/* 프로필 섹션 */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={
                    user.image ||
                    "/images/sample-image.jpg?height=100&width=100"
                  }
                  alt="프로필"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute -bottom-1 -right-1 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors">
                  <Edit3 className="h-3 w-3" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">
                  {user.name}{" "}
                  <GithubBadge githubUrl={user.portfolioAddress ?? ""} />
                </h2>
                <TooltipProvider>
                  <div className="flex items-center gap-2 text-gray-600 my-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Mail className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>해당 이메일은 다른 사용자에게 보이지 않습니다.</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </TooltipProvider>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-secondary-600">
                      {followData?.data?.followingCount ?? "0"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-secondary-600">
                      {followData?.data?.followerCount ?? "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => onEditClick(true)}
              className="hover:text-white hover:bg-blue-400"
            >
              프로필 편집
            </Button>
          </div>
        </div>

        {/* ✅ 탭 바 + 콘텐츠 영역 통합 */}
        <TabBar tabs={tabs} defaultValue={tabs[0].value} />
      </div>
    </div>
  );
}
