"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Link,
  Map,
  Gift,
  Save,
} from "lucide-react";
import { Button } from "@/components/uiSangmin/button";
import { Input } from "@/components/uiSangmin/input";
import { Textarea } from "@/components/uiSangmin/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/uiSangmin/card";
import { Label } from "@/components/uiSangmin/label";
import { Separator } from "@/components/uiSangmin/separator";
import { createDonationProject } from "@/apis/donation/register";

interface ProjectForm {
  title: string;
  content: string; // ✅ description ❌
  introduce: string;
  field: string;
  pricingPlanId: number;
  projectType: "DONATION";
  fundingPeriod: { start: string; end: string }; // 실제 donationDetail 내부 요소
  gitAddress: string;
  deployAddress: string;
  appStoreAddress: string;
  mainCategoryId: number;
  subCategoryIds: number[];
  donationMilestoneList: { title: string; content: string; dueDate: string }[];
  donationRewardList: { title: string; content: string; price: number }[];
}
const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    {icon}
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <Separator className="flex-1" />
  </div>
);

export default function CreateProjectPage({
  initialData,
}: {
  initialData?: any; // optional로 설정
}) {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);

  // 기본값 설정
  const defaultFormData: ProjectForm = {
    title: "",
    content: "",
    introduce: "",
    field: "",
    fundingPeriod: { start: "", end: "" },
    gitAddress: "",
    deployAddress: "",
    appStoreAddress: "",
    mainCategoryId: 1, // 기본값 설정 (수정 필요)
    subCategoryIds: [1], // 기본값 설정 (수정 필요)
    donationMilestoneList: [],
    donationRewardList: [],
    pricingPlanId: 1,
    projectType: "DONATION",
  };

  // props로 전달받은 데이터를 초기 상태로 설정
  const [formData, setFormData] = useState<ProjectForm>({
    ...defaultFormData,
    ...initialData, // initialData가 있으면 덮어씀
    fundingPeriod: {
      start: initialData?.donationDetail?.startDate || "",
      end: initialData?.donationDetail?.endDate || "",
    },
    gitAddress: initialData?.donationDetail?.gitAddress || "",
    deployAddress: initialData?.donationDetail?.deployAddress || "",
    appStoreAddress: initialData?.donationDetail?.appStoreAddress || "",
    mainCategoryId: initialData?.donationDetail?.mainCategoryId || 1,
    subCategoryIds: initialData?.donationDetail?.subCategoryIds || [1],
    donationMilestoneList:
      initialData?.donationDetail?.donationMilestoneList || [],
    donationRewardList: initialData?.donationDetail?.donationRewardList || [],
  });

  // 초기 데이터와 변환된 데이터 비교

  console.log("Initial Data:", initialData);
  console.log("Form Data:", formData);

  const handleInputChange = (field: keyof ProjectForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestDto = {
      title: formData.title,
      content: formData.content,
      introduce: formData.introduce,
      field: formData.field,
      pricingPlanId: formData.pricingPlanId,
      projectType: formData.projectType,
      donationDetail: {
        startDate: formData.fundingPeriod.start,
        endDate: formData.fundingPeriod.end,
        gitAddress: formData.gitAddress,
        deployAddress: formData.deployAddress,
        appStoreAddress: formData.appStoreAddress,
        mainCategoryId: formData.mainCategoryId,
        subCategoryIds: formData.subCategoryIds,
        donationMilestoneList: formData.donationMilestoneList,
        donationRewardList: formData.donationRewardList,
      },
    };

    const form = new FormData();
    form.append("requestDto", JSON.stringify(requestDto)); // 👈 핵심

    // Debug
    console.log("FormData for Submission:");
    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await createDonationProject(form);
      console.log("프로젝트 등록 성공:", res);
      alert("프로젝트가 성공적으로 등록되었습니다!");
      router.push("/projects");
    } catch (error) {
      console.error("프로젝트 등록 실패:", error);
      alert("프로젝트 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const addMilestone = () => {
    handleInputChange("donationMilestoneList", [
      ...formData.donationMilestoneList,
      { title: "", content: "", dueDate: "" },
    ]);
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.donationMilestoneList.filter(
      (_, i) => i !== index,
    );
    handleInputChange("donationMilestoneList", newMilestones);
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const newMilestones = formData.donationMilestoneList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    handleInputChange("donationMilestoneList", newMilestones);
  };

  const addReward = () => {
    handleInputChange("donationRewardList", [
      ...formData.donationRewardList,
      { title: "", content: "", price: 0 },
    ]);
  };

  const removeReward = (index: number) => {
    const newRewards = formData.donationRewardList.filter(
      (_, i) => i !== index,
    );
    handleInputChange("donationRewardList", newRewards);
  };

  const updateReward = (index: number, field: string, value: any) => {
    const newRewards = formData.donationRewardList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    handleInputChange("donationRewardList", newRewards);
  };
  // const isFormValid = () => {
  //   return (
  //     // formData.title.trim() !== "" &&
  //     // formData.description.trim() !== "" &&
  //     // formData.introduce.trim() !== "" &&
  //     // formData.field.trim() !== "" &&
  //   //   formData.fundingPeriod.start.trim() !== "" &&
  //   //   formData.fundingPeriod.end.trim() !== "" &&
  //   //   formData.donationMilestoneList.length > 0 &&
  //   //   formData.donationMilestoneList.every(
  //   //     milestone =>
  //   //       milestone.title.trim() !== "" &&
  //   //       milestone.content.trim() !== "" &&
  //   //       milestone.dueDate.trim() !== "",
  //   //   ) &&
  //   //   formData.donationRewardList.length > 0 &&
  //   //   formData.donationRewardList.every(
  //   //     reward =>
  //   //       reward.title.trim() !== "" &&
  //   //       reward.content.trim() !== "" &&
  //   //       reward.price > 0,
  //   //   );

  //  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">뒤로 가기</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-white rounded-full shadow-md border-gray-200 hover:shadow-lg transition-shadow"
          >
            {showPreview ? (
              <EyeOff className="h-5 w-5 text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-600" />
            )}
            <span>{showPreview ? "편집" : "미리보기"}</span>
          </Button>
        </div>

        <Card className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-gray-200/50">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
              프로젝트 등록
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* 기본 정보 */}
              <section>
                <SectionHeader
                  icon={<FileText className="h-6 w-6 text-blue-500" />}
                  title="기본 정보"
                />
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      프로젝트 제목 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={e => handleInputChange("title", e.target.value)}
                      placeholder="세상을 바꿀 멋진 프로젝트 이름을 지어주세요"
                      required
                      className="placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">
                      프로젝트 설명 <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={e =>
                        handleInputChange("content", e.target.value)
                      }
                      placeholder="프로젝트에 대한 상세한 설명을 작성해주세요"
                      required
                      className="min-h-[120px] placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="introduce">
                      한 줄 소개 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="introduce"
                      type="text"
                      value={formData.introduce}
                      onChange={e =>
                        handleInputChange("introduce", e.target.value)
                      }
                      placeholder="프로젝트의 핵심을 한 문장으로 표현해주세요"
                      required
                      className="placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="field">
                      프로젝트 분야 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="field"
                      type="text"
                      value={formData.field}
                      onChange={e => handleInputChange("field", e.target.value)}
                      placeholder="예: AI, 블록체인, 교육"
                      required
                      className="placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </section>

              {/* 펀딩 기간 */}
              <section>
                <SectionHeader
                  icon={<Calendar className="h-6 w-6 text-blue-500" />}
                  title="펀딩 기간"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">
                      시작일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.fundingPeriod.start}
                      onChange={e =>
                        handleInputChange("fundingPeriod", {
                          ...formData.fundingPeriod,
                          start: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">
                      종료일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.fundingPeriod.end}
                      onChange={e =>
                        handleInputChange("fundingPeriod", {
                          ...formData.fundingPeriod,
                          end: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </section>

              {/* 링크 정보 */}
              <section>
                <SectionHeader
                  icon={<Link className="h-6 w-6 text-blue-500" />}
                  title="관련 링크"
                />
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="gitAddress">GitHub 주소</Label>
                    <Input
                      id="gitAddress"
                      type="url"
                      value={formData.gitAddress}
                      onChange={e =>
                        handleInputChange("gitAddress", e.target.value)
                      }
                      placeholder="https://github.com/..."
                      className="placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deployAddress">배포 주소</Label>
                    <Input
                      id="deployAddress"
                      type="url"
                      value={formData.deployAddress}
                      onChange={e =>
                        handleInputChange("deployAddress", e.target.value)
                      }
                      placeholder="https://your-project.com"
                      className="placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="appStoreAddress">앱스토어 주소</Label>
                    <Input
                      id="appStoreAddress"
                      type="url"
                      value={formData.appStoreAddress}
                      onChange={e =>
                        handleInputChange("appStoreAddress", e.target.value)
                      }
                      placeholder="https://apps.apple.com/..."
                      className="placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </section>

              {/* 로드맵 */}
              <section>
                <SectionHeader
                  icon={<Map className="h-6 w-6 text-blue-500" />}
                  title="로드맵"
                />
                <div className="space-y-6">
                  {formData.donationMilestoneList.map((milestone, index) => (
                    <Card
                      key={index}
                      className="bg-gray-50/70 p-4 rounded-lg border"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-700">
                          마일스톤 {index + 1}
                        </h4>
                        {formData.donationMilestoneList.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMilestone(index)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <Input
                          type="text"
                          value={milestone.title}
                          onChange={e =>
                            updateMilestone(index, "title", e.target.value)
                          }
                          placeholder="마일스톤 제목"
                          className="placeholder:text-gray-400"
                        />
                        <Textarea
                          value={milestone.content}
                          onChange={e =>
                            updateMilestone(index, "content", e.target.value)
                          }
                          placeholder="달성할 목표에 대해 설명해주세요"
                          className="placeholder:text-gray-400"
                        />
                        <Input
                          type="date"
                          value={milestone.dueDate}
                          onChange={e =>
                            updateMilestone(index, "dueDate", e.target.value)
                          }
                        />
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMilestone}
                    className="w-full border-dashed border-2 hover:border-solid hover:border-blue-500 hover:text-blue-500 bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    로드맵 추가
                  </Button>
                </div>
              </section>

              {/* 리워드 */}
              <section>
                <SectionHeader
                  icon={<Gift className="h-6 w-6 text-blue-500" />}
                  title="리워드"
                />
                <div className="space-y-6">
                  {formData.donationRewardList.map((reward, index) => (
                    <Card
                      key={index}
                      className="bg-gray-50/70 p-4 rounded-lg border"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-700">
                          리워드 {index + 1}
                        </h4>
                        {formData.donationRewardList.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeReward(index)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <Input
                          type="text"
                          value={reward.title}
                          onChange={e =>
                            updateReward(index, "title", e.target.value)
                          }
                          placeholder="리워드 제목"
                          className="placeholder:text-gray-400"
                        />
                        <Textarea
                          value={reward.content}
                          onChange={e =>
                            updateReward(index, "content", e.target.value)
                          }
                          placeholder="후원자에게 제공될 리워드를 설명해주세요"
                          className="placeholder:text-gray-400"
                        />
                        <Input
                          type="number"
                          value={reward.price}
                          onChange={e =>
                            updateReward(
                              index,
                              "price",
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          placeholder="리워드 가격 (원)"
                          className="placeholder:text-gray-400"
                        />
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addReward}
                    className="w-full border-dashed border-2 hover:border-solid hover:border-blue-500 hover:text-blue-500 bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    리워드 추가
                  </Button>
                </div>
              </section>
              {/* 가격 플랜 */}
              <section>
                <SectionHeader
                  icon={<Gift className="h-6 w-6 text-blue-500" />}
                  title="가격 플랜"
                />
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pricingPlanId"
                        value={1}
                        checked={formData.pricingPlanId === 1}
                        onChange={() => handleInputChange("pricingPlanId", 1)}
                      />
                      <span>베이직</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pricingPlanId"
                        value={2}
                        checked={formData.pricingPlanId === 2}
                        onChange={() => handleInputChange("pricingPlanId", 2)}
                      />
                      <span>프로</span>
                    </label>
                  </div>
                </div>
              </section>
              {/* 제출 버튼 */}
              <div className="pt-6">
                <Button
                  type="submit"
                  // disabled={!isFormValid()}
                  className="w-full text-lg font-bold py-6 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Save className="mr-2 h-5 w-5" />
                  프로젝트 등록하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
