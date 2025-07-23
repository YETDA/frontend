"use client";

import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
interface NotificationData {
  type: string;
  message: string;
  timestamp: string;
  data?: any;
}
import { useNotification } from "../(user)/alram/NotificationContext";

export const SSEProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastMessage, setLastMessage] = useState<NotificationData | null>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    const evtSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/stream`,
      {
        withCredentials: true,
      },
    );
    console.log(evtSource);

    evtSource.onopen = () => {
      console.log("SSE 연결 성공");
    };

    evtSource.addEventListener("connect", e => {
      try {
        const raw = (e as MessageEvent).data;
        let data;

        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }

        console.log("연결 수신:", data);

        addNotification(
          "connect",
          "연결 알림",
          data.message || "SSE가 연결 되었습니다.",
        );
      } catch (error) {
        console.error("알림 파싱 오류:", error);
        addNotification(
          "error",
          "알림 오류",
          "알림 데이터를 처리할 수 없습니다.",
        );
      }
    });

    evtSource.addEventListener("alarm", event => {
      console.log("알람 이벤트 데이터:", (event as MessageEvent).data);

      try {
        const data = JSON.parse((event as MessageEvent).data);
        console.log("알람 수신:", data);

        addNotification(
          "alarm",
          "🔔 새로운 알림",
          data.message || "새로운 알림이 도착했습니다.",
        );

        setLastMessage(data);
      } catch (error) {
        console.error("알람 파싱 오류:", error);
        console.log(
          "원본 알람 데이터 (파싱 실패):",
          (event as MessageEvent).data,
        );

        const notificationData: NotificationData = {
          type: "alarm",
          message: `알람 수신: ${(event as MessageEvent).data}`,
          timestamp: new Date().toISOString(),
        };

        setLastMessage(notificationData);
      }
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
