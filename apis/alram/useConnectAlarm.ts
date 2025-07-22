import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState } from "react";

export function useConnectAlarm() {
  const [statusData, setStatusData] = useState<string>("CONNECTING");

  useEffect(() => {
    const evtSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/stream`,
      {
        withCredentials: true,
      },
    );

    evtSource.onopen = () => {
      console.log("SSE 연결 성공");
      setStatusData("OPEN");
    };

    evtSource.onerror = err => {
      console.error("SSE 연결 오류", err);
      setStatusData("ERROR");
    };

    return () => {
      evtSource.close();
      console.log("SSE 연결 종료");
    };
  }, []);

  return statusData;
}
