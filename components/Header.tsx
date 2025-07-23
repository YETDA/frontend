"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Heart } from "lucide-react";
import axios from "axios";
import LoginModal from "@/app/(guest)/login/components/LoginModal";

interface UserData {
  image: string;
  name?: string;
  nickname?: string;
}

export default function Header() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
          { withCredentials: true },
        );
        setUserData(res.data.data);
        console.log("유저데이터", userData);
      } catch (e) {
        setUserData(null);
        console.error("에러", e);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="w-full bg-[white] border-b border-[#EAEAEA]">
      <div className="max-w-[1168px] h-[76px] mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" width={80} height={30} alt="logo" />
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

            <Link href="/my" className="flex items-center rounded-full gap-4">
              <Image
                src={userData.image}
                width={40}
                height={40}
                alt="profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <span className="font-semibold">
                {userData.name ?? userData.nickname ?? "이름 없음"}
              </span>
            </Link>
          </nav>
        ) : (
          <div
            onClick={() => setOpen(true)}
            className="w-[84px] h-[40px] flex justify-center items-center font-bold text-sm bg-[#0F172A] rounded-md text-white cursor-pointer"
          >
            로그인
          </div>
        )}
      </div>
      <LoginModal open={open} onOpenChange={setOpen} />
    </header>
  );
}
