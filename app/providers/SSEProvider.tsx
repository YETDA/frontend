"use client";

import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export const SSEProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const evtSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/stream`,
      {
        withCredentials: true,
      },
    );

    evtSource.onopen = () => {
      console.log("SSE 연결 성공");
    };

    evtSource.addEventListener("connect", e => {
      console.log("connect 이벤트 수신:", e);
      console.log("connect 이벤트 수신:", (e as MessageEvent).data);
    });

    evtSource.onerror = e => {
      console.error("SSE 오류 발생:", e);
    };

    return () => {
      evtSource.close();
      console.log("SSE 연결 종료");
    };
  }, []);

  return <>{children}</>;
};
