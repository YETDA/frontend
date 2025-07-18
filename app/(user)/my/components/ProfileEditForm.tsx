import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/MyTextarea";
import { MyCard, MyCardContent, MyCardHeader, MyCardTitle } from "./ui/MyCard";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
  checkUserEmail,
  logout,
  sendVerificationEmail,
  sendVerificationResult,
} from "@/apis/my/ProfileApi";
import { AccountSection } from "./AccountSection";

interface ProfileFormProps {
  name: string;
  email?: string;
  portfolioAddress: string | null | "";
  introduce?: string | null;
  image: string;
}

export function ProfileEditForm({
  user,
  onProfileClick,
  onSubmitSuccess,
}: {
  user: ProfileFormProps;
  onProfileClick: (isEditing: boolean) => void;
  onSubmitSuccess: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState(user || "");
  const [previewImage, setPreviewImage] = useState<string>(user.image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleEmailCheck = async () => {
    try {
      const email = value.email;
      if (!email) {
        alert("이메일을 입력해주세요.");
        return;
      }

      const result = await checkUserEmail(email);
      if (result === 409) {
        alert("사용 중인 이메일입니다.");
        setShowVerificationInput(false);
        return;
      }

      if (result.statusCode === 200) {
        setShowVerificationInput(true);
        sendVerificationEmail(email);
        alert("인증 메일을 보냈습니다. 이메일을 확인해주세요.");
        return;
      } else {
        setShowVerificationInput(false);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      alert("이메일 인증 요청에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const result = await sendVerificationResult(
        value.email!,
        verificationCode,
      );
      if (result.statusCode === 200) {
        setEmailVerified(true);
        alert("이메일 인증에 성공했습니다!");
      } else {
        setEmailVerified(false);

        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("이메일 인증에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");

      alert("로그아웃 되었습니다.");
    } catch (error) {
      alert("로그아웃에 실패하였습니다!");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const jsonBlob = new Blob(
        [
          JSON.stringify({
            name: value.name,
            email: value.email,
            introduce: value.introduce,
            portfolioAddress: value.portfolioAddress,
          }),
        ],
        { type: "application/json" },
      );

      formData.append("info", jsonBlob);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("프로필 수정 실패");
      }

      onSubmitSuccess();
      onProfileClick(false);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold mt-5">프로필 수정</h3>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => onProfileClick(false)}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="hover:bg-blue-600"
          >
            {isLoading ? "저장 중..." : "저장"}
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className="hover:bg-red-600"
          >
            로그아웃
          </Button>
        </div>
      </div>

      <MyCard>
        <MyCardHeader>
          <MyCardTitle>기본 정보</MyCardTitle>
        </MyCardHeader>
        <MyCardContent className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src={previewImage || user.image}
                width={120}
                height={120}
                alt="Profile Picture"
                className="rounded-full object-cover border-2 border-gray-200"
              />
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="w-32 text-xs"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex-1 space-y-4">
              {/* 이름 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">이름</label>
                <Input
                  value={value.name}
                  onChange={e => setValue({ ...value, name: e.target.value })}
                  placeholder="이름을 입력하세요"
                />
              </div>

              {/* 포트폴리오 주소 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">포트폴리오 주소</label>
                <Input
                  value={value.portfolioAddress ?? ""}
                  onChange={e =>
                    setValue({ ...value, portfolioAddress: e.target.value })
                  }
                  placeholder="포트폴리오 주소를 입력해 주세요."
                />
              </div>

              {/* 이메일 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">이메일</label>
                <div className="flex gap-2">
                  <Input
                    value={value.email}
                    onChange={e =>
                      setValue({ ...value, email: e.target.value })
                    }
                    placeholder="이메일을 입력해 주세요."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleEmailCheck}
                    disabled={isLoading || emailVerified}
                    variant="outline"
                  >
                    {emailVerified ? "인증완료" : "인증"}
                  </Button>
                </div>

                {showVerificationInput && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                      placeholder="인증 코드를 입력하세요"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={isLoading}
                      variant="outline"
                    >
                      확인
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* 소개글 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">소개글</label>
            <Textarea
              value={value.introduce || ""}
              onChange={e => setValue({ ...value, introduce: e.target.value })}
              placeholder="자신을 소개하는 글을 적어보세요."
              rows={4}
            />
          </div>
        </MyCardContent>
      </MyCard>

      {/* 계좌 정보 */}
      <AccountSection />
    </div>
  );
}
