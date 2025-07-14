"use client";

import { useState } from "react";
import { getUserInfo } from "@/app/api/user/UserInfo";
import { useAuthStore } from "@/stores/useAuthStore";

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

export default function TestPage() {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useAuthStore.getState().accessToken;
  console.log("토큰 값", token);

  const handleUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserInfo(token);
      setUserData(data);
    } catch (err) {
      setError("유저 정보 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">테스트 페이지</h1>
      <button
        onClick={handleUserInfo}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        유저 정보 조회
      </button>

      {loading && <p>로딩 중…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(userData, null, 2)}
        </pre>
      )}
    </div>
  );
}
