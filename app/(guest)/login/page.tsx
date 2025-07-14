import { cookies } from "next/headers";
import LoginClient from "./components/LoginClient";

export default async function Page() {
  const cookieStore = await cookies();
  console.log(cookieStore, "쿠키");
  const token = cookieStore.get("accessToken")?.value ?? "";
  console.log("쿠키 토큰 값", token);
  return <LoginClient initialToken={token} />;
}
