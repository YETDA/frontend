"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// 마이페이지 구성 컴포넌트

import { Profile } from "./components/Profile";
import { ProfileEditForm } from "./components/ProfileEditForm";

export default function MyPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
        {
          withCredentials: true,
        },
      );
      setUserData(res.data.data);
    } catch (err) {
      console.error("로그인 필요 또는 인증 실패:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      {!userData ? (
        <div>로딩 중...</div>
      ) : isEditing ? (
        <ProfileEditForm
          user={userData}
          onProfileClick={setIsEditing}
          onSubmitSuccess={fetchUser}
        />
      ) : (
        <>
          <Profile user={userData} onEditClick={setIsEditing} />
        </>
      )}
    </main>
  );
}
