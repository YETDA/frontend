"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";

interface Props {
  initialToken: string;
}

export default function LoginClient({ initialToken }: Props) {
  const setAccessToken = useAuthStore(s => s.setAccessToken);
  const redirectUri = encodeURIComponent("http://localhost:3000");

  useEffect(() => {
    console.log("LoginClient – initialToken:", initialToken);
    if (initialToken) {
      setAccessToken(initialToken);
      console.log(
        "Zustand store – accessToken:",
        useAuthStore.getState().accessToken,
      );
    }
  }, [initialToken, setAccessToken]);

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao?state=${redirectUri}`;
  };
  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      {/* 로고 */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-md-navItem">필요한 작품에 엤다</div>
        <Image
          src="/images/sample-logo.png"
          width={125}
          height={64}
          alt="logo"
        />
      </div>
      {/* 소셜 로그인 */}
      <div className="flex flex-col gap-5">
        <button onClick={handleKakaoLogin}>
          <Image
            src="/images/kakao-login.png"
            width={300}
            height={50}
            alt="카카오 로그인"
          />
        </button>
        <button onClick={handleGithubLogin}>
          <Image
            src="/images/github-login.png"
            width={300}
            height={50}
            alt="깃허브 로그인"
          />
        </button>
      </div>
    </div>
  );
}
