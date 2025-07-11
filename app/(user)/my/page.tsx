"use client";

import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Follower } from "./components/Follower";
import { Introduce } from "./components/Introduce";
import { Profile } from "./components/Profile";
import { TabBar } from "./components/TabBar";
import { ProfileEditForm } from "./components/ProfileEditForm";

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

const tabs: Tab[] = [
  {
    value: "소개글",
    content: <Introduce />,
  },
  {
    value: "팔로워",
    content: <Follower user={followers} following={following} />,
  },
  {
    value: "팔로잉",
    content: <Follower user={following} following={following} />,
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
];

const user = {
  name: "서현우",
  email: "seohyun@example.com",
  github: "https://github.com/seohyun",
  introduce: "안녕하세요, 서현우입니다. 개발자입니다.",
  image: "/images/sample-image.jpg",
  followers: 120,
  following: 80,
  purchaseProjects: 5,
  donation: 10,
};

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main>
      {isEditing ? (
        <ProfileEditForm user={user} onProfileClick={setIsEditing} />
      ) : (
        <>
          <Profile onEditClick={setIsEditing} />
          <TabBar defaultValue="소개글" tabs={tabs} />
        </>
      )}
    </main>
  );
}
