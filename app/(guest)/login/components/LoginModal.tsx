"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [redirectUri, setRedirectUri] = useState("");

  useEffect(() => {
    setRedirectUri(encodeURIComponent(window.location.origin));
  }, []);

  const handleKakaoLogin = () => {
    if (!redirectUri) return;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao?state=${redirectUri}`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
      <DialogContent
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[400px] h-[580px] rounded-2xl bg-white p-8
          shadow-2xl focus:outline-none
          flex flex-col justify-center items-center gap-10
        "
      >
        {/* 닫기 버튼 */}
        <DialogClose asChild></DialogClose>

        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-md text-bold">필요한 작품에 예따</div>
          <Image src="/logo.png" width={125} height={64} alt="logo" priority />
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <button
            onClick={handleKakaoLogin}
            className="h-[40px] w-[310px] cursor-pointer"
          >
            <Image
              src="/images/kakao-login.png"
              alt="kakao"
              width={310}
              height={40}
            />
          </button>

          <button
            onClick={handleGithubLogin}
            className="h-[40px] w-[310px] cursor-pointer"
          >
            <Image
              src="/images/github-login.png"
              alt="github"
              width={310}
              height={40}
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
