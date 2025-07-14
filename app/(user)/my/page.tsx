"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { Follower } from "./components/Follower";
import { Introduce } from "./components/Introduce";
import { Profile } from "./components/Profile";
import { TabBar } from "./components/TabBar";
import { ProfileEditForm } from "./components/ProfileEditForm";
import { useFollow } from "@/app/api/my/useFollow";
import { useFollowing } from "@/app/api/my/useFollowing";
import { usePurchase } from "@/app/api/my/usePurchase";
import MyProjectCard from "./components/ui/MyProjectCard";
import { PurchaseProject } from "@/types/user/purchaseProject";
import { useOoderList } from "@/app/api/my/useOrderList";
import { Order } from "@/types/user/orderList";

interface Tab {
  value: string;
  content: React.ReactNode;
}

interface PurchaseProjectResponse {
  data: PurchaseProject;
}

export default function MyPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const following = useFollowing();
  const followers = useFollow();
  const purchaseProjects: PurchaseProject | null = usePurchase();
  const orderList: Order[] | null = useOoderList();

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLqsJDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ5NTY5NywiZXhwIjoxNzUyNTA2NDk3fQ.0VL3n2CVJgna0eXp2ZAtRV5Xxc5vGYqq_xbEYJj1XOA`,
          },
        },
      );

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("로그인 필요 또는 인증 실패:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const tabs: Tab[] = userData
    ? [
        {
          value: "소개글",
          content: <Introduce introduce={userData.data.introduce} />,
        },
        {
          value: "팔로워",
          content: (
            <Follower user={followers?.data} following={following?.data} />
          ),
        },
        {
          value: "팔로잉",
          content: (
            <Follower user={following?.data} following={following?.data} />
          ),
        },
        {
          value: "후원한 예따",
          // 후원한 프로젝트 api는 아직 없으므로 구매한 프로젝트 api를 활용하여 나타냈습니다.
          content: (
            <div className="grid grid-cols-4 justify-items-center">
              {purchaseProjects?.content?.map((project, index) => (
                <MyProjectCard
                  key={`${project.id}-${index}`}
                  project={{
                    id: project.id,
                    title: project.title,
                    purchaseOptions: project.purchaseOptions,
                    contentImageUrls:
                      project.contentImageUrls?.[0] ||
                      "/images/sample-image.jpg",
                    hostName: project.hostName,
                  }}
                />
              ))}
            </div>
          ),
        },

        {
          value: "구매한 예따",
          content: (
            <div className="grid grid-cols-4 justify-items-center">
              {purchaseProjects?.content?.map((project, index) => (
                <MyProjectCard
                  key={`${project.id}-${index}`}
                  project={{
                    id: project.id,
                    title: project.title,
                    purchaseOptions: project.purchaseOptions,
                    contentImageUrls:
                      project.contentImageUrls?.[0] ||
                      "/images/sample-image.jpg",
                    hostName: project.hostName,
                  }}
                />
              ))}
            </div>
          ),
        },
        {
          value: "등록한 프로젝트",
          content: (
            <div className="grid grid-cols-4 justify-items-center"></div>
          ),
        },
      ]
    : [];

  return (
    <main>
      {!userData ? (
        <div>로딩 중...</div>
      ) : isEditing ? (
        <ProfileEditForm
          user={userData.data}
          onProfileClick={setIsEditing}
          onSubmitSuccess={fetchUser}
        />
      ) : (
        <>
          <Profile
            user={userData.data}
            purchaseProject={orderList?.length ?? 0}
            onEditClick={setIsEditing}
          />
          <TabBar defaultValue="소개글" tabs={tabs} />
        </>
      )}
    </main>
  );
}
