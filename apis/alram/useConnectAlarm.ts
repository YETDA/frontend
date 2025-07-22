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

    // 연결 확인용 이벤트로 인해 addEventListener 사용
    evtSource.addEventListener("connect", e => {
      console.log("connect 이벤트 수신:", e);
      console.log("데이터:", (e as MessageEvent).data);
    });

    // event 정의 없이 모든 알림이 동일하게 전송될 경우 onmessage 사용
    evtSource.onmessage = e => {
      console.log("알람 수신: ", e.data);
    };

    return () => {
      evtSource.close();
      console.log("SSE 연결 종료");
    };
  }, []);

  return statusData;
}
