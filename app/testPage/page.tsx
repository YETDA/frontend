"use client";

import { useStore } from "@/stores/useStore";

/**
 * TestPage
 * - Zustand 상태를 테스트할 단일 페이지
 * - 컴포넌트 분리 없이 한 파일에서 상태 확인 및 조작
 */
export default function TestPage() {
  const count = useStore(state => state.count);
  const increase = useStore(state => state.increase);
  const decrease = useStore(state => state.decrease);

  return (
    <div>
      <h1>Test Page</h1>
      <h2>Count: {count}</h2>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
