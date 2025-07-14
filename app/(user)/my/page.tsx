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

interface Tab {
  value: string;
  content: React.ReactNode;
}
const followers = [
  {
    id: "1",
    name: "John Doe",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, John Doe입니다. 개발자입니다.",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, Jane Smith입니다. 디자이너입니다.",
  },
];

const following = [
  {
    id: "1",
    name: "John Doe",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, John Doe입니다. 개발자입니다.",
  },
  {
    id: "3",
    name: "Bob Brown",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, Bob Brown입니다. 기획자입니다.",
  },
];

type FollowData = {
  timestamp: string;
  statusCode: number;
  message: string;
  data: number[];
};

export default function MyPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const following = useFollowing();
  const followers = useFollow();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ4NjEyNywiZXhwIjoxNzUyNDk2OTI3fQ.h3OWtqbunjSOAHQ7b-kWsrMjmHOkw2b8QLHmsm85Kps`,
            },
          },
        );

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

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
          content: (
            <div className="grid grid-cols-4 justify-items-center">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          ),
        },
        {
          value: "구매한 예따",
          content: (
            <div className="grid grid-cols-4 justify-items-center">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          ),
        },
        {
          value: "등록한 프로젝트",
          content: (
            <div className="grid grid-cols-4 justify-items-center">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          ),
        },
      ]
    : [];

  return (
    <main>
      {!userData ? (
        <div>로딩 중...</div>
      ) : isEditing ? (
        <ProfileEditForm user={userData.data} onProfileClick={setIsEditing} />
      ) : (
        <>
          <Profile user={userData.data} onEditClick={setIsEditing} />
          <TabBar defaultValue="소개글" tabs={tabs} />
        </>
      )}
    </main>
  );
}
