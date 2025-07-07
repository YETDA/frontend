import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ExampleSlice } from "./exampleSlice";

import { createExampleSlice } from "./exampleSlice";

/**
 * Store 타입 정의
 * - 여러 slice 타입을 &로 합쳐서 하나의 store로 만듦
 * - 모든 상태와 액션을 한 곳에서 관리
 * 예: CounterSlice & UserSlice
 */
type Store = ExampleSlice;

/**
 * useStore
 * - zustand 중앙 스토어 생성
 * - persist 미들웨어로 localStorage에 자동 저장
 */
export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createExampleSlice(...a),
    }),
    {
      name: "global-store", // localStorage 키 이름
    },
  ),
);

// https://zustand.docs.pmnd.rs/guides/typescript#slices-pattern
//
