import { Mail } from "lucide-react";
import Image from "next/image";

import { useFollowCount } from "@/apis/my/useFollowCount";
import { useUserOrderList } from "@/apis/my/useUserOrderList";
import { Button } from "@/components/ui/button";

import { GithubBadge } from "./GithubBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/MyTooltip";

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
  purchaseProject: number;
}
export function Profile({ user, onEditClick, purchaseProject }: ProfileProps) {
  const followData = useFollowCount();
  const userOrderList = useUserOrderList();

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pt-5 pb-5 gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
        <div className="flex-shrink-0">
          <Image
            src={user.image || "/images/sample-image.jpg?height=100&width=100"}
            width={100}
            height={100}
            alt="Profile Picture"
            className="rounded-full object-cover border-2 border-gray-100"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              {user.portfolioAddress ? (
                <GithubBadge githubUrl={user.portfolioAddress} />
              ) : null}
            </div>

            <TooltipProvider>
              <div className="flex items-center gap-2 text-gray-600">
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
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">팔로잉</p>
              <p className="font-bold text-lg">
                {followData?.data?.followingCount ?? "0"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">팔로워</p>
              <p className="font-bold text-lg">
                {followData?.data?.followerCount ?? "0"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">구매수</p>
              <p className="font-bold text-lg">{purchaseProject}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">프로젝트 수</p>
              <p className="font-bold text-lg">
                {userOrderList?.allProjectCount ?? "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6"
          onClick={() => onEditClick(true)}
        >
          내 정보 수정
        </Button>
      </div>
    </div>
  );
}
