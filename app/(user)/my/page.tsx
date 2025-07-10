import { Follower } from "./components/Follower";
import { Introduce } from "./components/Introduce";
import { Profile } from "./components/Profile";
import { TabBar } from "./components/TabBar";

interface Tab {
  value: string;
  content: React.ReactNode;
}
const followers = [
  {
    id: "1",
    name: "John Doe",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, John Doe입니다. 개발자입니다.",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, Jane Smith입니다. 디자이너입니다.",
  },
];

const following = [
  {
    id: "1",
    name: "John Doe",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, John Doe입니다. 개발자입니다.",
  },
  {
    id: "3",
    name: "Bob Brown",
    image: "/images/sample-image.jpg",
    introduce: "안녕하세요, Bob Brown입니다. 기획자입니다.",
  },
];

const tabs: Tab[] = [
  {
    value: "소개글",
    content: <Introduce />,
  },
  {
    value: "팔로워",
    content: <Follower user={followers} following={following} />,
  },
  {
    value: "팔로잉",
    content: <Follower user={following} following={following} />,
  },
  {
    value: "후원한 예따",
    content: <div>Privacy Settings</div>,
  },
  {
    value: "구매한 예따",
    content: <div>Privacy Settings</div>,
  },
  {
    value: "등록한 프로젝트",
    content: <div>Privacy Settings</div>,
  },
];

export default function MyPage() {
  return (
    <main>
      <Profile />
      <TabBar defaultValue="소개글" tabs={tabs} />
    </main>
  );
}
