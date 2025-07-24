// types/project/donation.ts

import { ProductOption } from "./project";

export interface DonationProject {
  // 리워드 옵션 목록
  purchaseOptions: ProductOption[];

  // 통계
  projectCount: number; // 총 후원 금액 또는 횟수
  followerCount: number; // 팔로워 수

  // 기본 정보
  projectId: number;
  title: string;
  introduce: string;
  content: string;

  // 후원 마감일 (ISO 문자열)
  projectEndDate: string;

  // 깃허브 주소 (optional)
  gitAddress?: string;

  // 카테고리
  purchaseCategoryId: number;
  purchaseCategoryName: string;

  // 평균 제공 시간
  averageDeliveryTime: string;

  // 상세 이미지 URL 배열
  contentImageUrls: string[];

  // 호스트 정보
  userId: number;
  name: string;
  userProfileImage: string;
  userIntroduce: string;
  email: string;
}
