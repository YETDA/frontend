"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Heart } from "lucide-react";
import axios from "axios";

export default function Header() {
  const [userData, setUserData] = useState<any>(null);

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
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3">
      <Link href="/">
        <Image
          src="/images/sample-logo.png"
          width={30}
          height={30}
          alt="logo"
        />
      </Link>

      {userData ? (
        <div className="flex items-center gap-6 text-sm">
          <Link href="/project/new">
            <button className="px-4 py-1 border rounded-full hover:bg-gray-100 transition">
              프로젝트 등록
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <Bell width={20} height={20} />
            <Heart width={20} height={20} />
          </div>

          <div className="flex items-center gap-2">
            <Link href="/my">
              <Image
                src={userData.profileImageUrl ?? "/images/sample-profile.png"}
                width={32}
                height={32}
                alt="profile"
                className="rounded-full object-cover cursor-pointer"
              />
            </Link>
            <span className="font-medium">{userData.nickname}</span>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <div className="text-sm cursor-pointer">로그인/회원가입</div>
        </Link>
      )}
    </div>
  );
}
