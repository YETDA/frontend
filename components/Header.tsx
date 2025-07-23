"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Heart } from "lucide-react";
import axios from "axios";

interface UserData {
  image: string;
  name?: string;
  nickname?: string;
}

export default function Header() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
          { withCredentials: true },
        );
        setUserData(res.data.data);
      } catch {
        setUserData(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 shadow-black/20">
      <div className="container mx-auto px-6 flex items-center justify-between py-4 ">
        <Link href="/">
          <Image src="/images/yetda2.svg" width={130} height={96} alt="logo" />
        </Link>

        {userData ? (
          <nav className="flex items-center gap-8 text-base">
            <Link href="/project/new">
              <button className="px-5 py-2 rounded-full hover:bg-gray-100 transition">
                프로젝트 등록
              </button>
            </Link>

            <div className="flex items-center gap-6">
              <Bell className="w-6 h-6" />
              <Heart className="w-6 h-6" />
            </div>

            <Link href="/my" className="flex items-center gap-4">
              <Image
                src={userData.image}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full object-cover"
              />
              <span className="font-semibold">
                {userData.name ?? userData.nickname ?? "이름 없음"}
              </span>
            </Link>
          </nav>
        ) : (
          <Link href="/login">
            <span className="cursor-pointer">로그인/회원가입</span>
          </Link>
        )}
      </div>
    </header>
  );
}
