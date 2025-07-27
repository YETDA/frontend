export interface ProjectDetailData {
  projectCount?: number;
  followerCount?: number;
  viewCount?: number;
  projectId?: number;
  title?: string;
  introduce?: string;
  content?: string;
  contentImageUrls?: string[];
  mainCategoryId?: number;
  mainCategoryName?: string;
  projectSubCategories?: {
    subjectCategoryId: number;
    subjectCategoryName: string;
  }[];
  startDate?: string;
  endDate?: string;
  gitAddress?: string;
  deployAddress?: string;
  appStoreAddress?: string;
  userId?: number;
  name?: string;
  userProfileImage?: string;
  userIntroduce?: string | null;
  email?: string;
  currentFunding?: number;
  rewards?: {
    id: string;
    name: string;
    description: string;
    amount: number;
    deliveryMethod: string;
    maxQuantity: number;
    currentQuantity: number;
  }[];
  roadmap?: {
    title: string;
    date: string;
    description: string;
  }[];
}

export const defaultProject: ProjectDetailData = {
  projectId: 1,
  title: "AI 기반 개인 비서 앱",
  introduce: "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서입니다.",
  content:
    "음성 인식, 자연어 처리, 머신러닝 기술을 활용하여 사용자의 일정 관리, 정보 검색, 알림 서비스 등을 제공합니다.",
  contentImageUrls: [
    "/placeholder.jpeg",
    "/placeholder.jpeg",
    "/placeholder.jpeg",
  ],

  mainCategoryId: 1,
  mainCategoryName: "앱 서비스",
  projectSubCategories: [
    {
      subjectCategoryId: 1,
      subjectCategoryName: "AI",
    },
    {
      subjectCategoryId: 2,
      subjectCategoryName: "개인 비서",
    },
  ],
  startDate: "2024-01-01",
  endDate: "2024-03-31",
  gitAddress: "https://github.com/example/repo",
  deployAddress: "https://example.com",
  appStoreAddress: "https://appstore.com/example",
  userId: 1,
  name: "김개발",
  userProfileImage: "/profile.jpeg",
  userIntroduce: "안녕하세요, AI 앱 개발자 김개발입니다.",
  email: "dev@example.com",
  currentFunding: 3200000,
  rewards: [
    {
      id: "1",
      name: "얼리버드 리워드",
      description: "앱 출시 후 1개월 이내에 다운로드 가능한 베타 버전",
      amount: 500,
      deliveryMethod: "앱스토어 링크",
      maxQuantity: 100,
      currentQuantity: 45,
    },
    {
      id: "2",
      name: "프리미엄 리워드",
      description: "베타 버전 + 추가 기능 3개월 무료 이용권",
      amount: 500,
      deliveryMethod: "앱스토어 링크 + 이메일",
      maxQuantity: 50,
      currentQuantity: 23,
    },
  ],
  roadmap: [
    {
      title: "프로젝트 시작",
      date: "2024-01-01",
      description: "프로젝트를 시작합니다.",
    },
    {
      title: "1차 개발 완료",
      date: "2024-02-15",
      description: "기본 기능 개발이 완료되었습니다.",
    },
    {
      title: "베타 테스트",
      date: "2024-03-01",
      description: "사용자를 대상으로 베타 테스트를 진행합니다.",
    },
    {
      title: "정식 출시",
      date: "2024-04-01",
      description: "앱스토어에 정식으로 출시됩니다.",
    },
  ],
};
