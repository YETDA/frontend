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
    <header className="bg-white border-b border-gray-200 ">
      <div className="container mx-auto px-6 flex items-center justify-between py-3">
        <Link href="/">
          <Image
            src="/images/yetalogofinal.png"
            width={100}
            height={60}
            alt="logo"
            className="object-contain"
          />
        </Link>

        {userData ? (
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/project/new">
              <button className="px-4 py-1 rounded-full hover:bg-gray-100 transition">
                프로젝트 등록
              </button>
            </Link>

            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5" />
              <Heart className="w-5 h-5" />
            </div>

            <Link href="/my" className="flex items-center gap-3">
              <Image
                src={userData.image}
                width={32}
                height={32}
                alt="profile"
                className="rounded-full object-cover"
              />
              <span className="font-medium">
                {userData.name ?? userData.nickname ?? "이름 없음"}
              </span>
            </Link>
          </nav>
        ) : (
          <Link href="/login">
            <span className="text-sm cursor-pointer">로그인/회원가입</span>
          </Link>
        )}
      </div>
    </header>
  );
}
