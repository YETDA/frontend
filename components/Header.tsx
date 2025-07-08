"use client";

import Image from "next/image";
import { Bell, Heart } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full flex justify-between items-center p-4">
      <Image src="/images/sample-logo.png" width={24} height={24} alt="logo" />
      {isLoggedIn ? (
        <div
          className="text-xs cursor-pointer"
          onClick={() => setIsLoggedIn(false)}
        >
          <div className="flex justify-center items-center gap-4">
            <Bell width={20} height={20} />
            <Heart width={20} height={20} />
            <div className="flex justify-center itmes-center gap-2">
              <Image
                src="/images/sample-profile.png"
                width={16}
                height={16}
                alt="profile"
                className="rounded-full"
              />
              <div className="text-xs">현우</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="text-xs cursor-pointer"
          onClick={() => setIsLoggedIn(true)}
        >
          로그인/회원가입
        </div>
      )}
    </div>
  );
}
