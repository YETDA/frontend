"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MyCard, MyCardContent, MyCardHeader, MyCardTitle } from "./ui/MyCard";
import { Trash2, Plus } from "lucide-react";
import {
  getUserAccount,
  updateUserAccount,
  deleteUserAccount,
} from "@/apis/my/ProfileApi";

interface AccountInfo {
  bank: string;
  account: string;
}

export function AccountSection() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    bank: "",
    account: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    loadAccountInfo();
  }, []);

  const loadAccountInfo = async () => {
    try {
      const result = await getUserAccount();
      if (result.data) {
        setAccountInfo(result.data);
        setHasAccount(true);
      }
    } catch (error) {
      console.error("계좌 정보 로드 실패:", error);
    }
  };

  const handleSaveAccount = async () => {
    if (!accountInfo.bank || !accountInfo.account) {
      alert("은행과 계좌번호를 모두 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await updateUserAccount(accountInfo.bank, accountInfo.account);
      alert("계좌 정보가 저장되었습니다.");
      setHasAccount(true);
      setIsEditing(false);
    } catch (error) {
      alert("계좌 정보 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("계좌 정보를 삭제하시겠습니까?")) return;

    try {
      setIsLoading(true);
      await deleteUserAccount();
      setAccountInfo({ bank: "", account: "" });
      setHasAccount(false);
      setIsEditing(false);
      alert("계좌 정보가 삭제되었습니다.");
    } catch (error) {
      alert("계좌 정보 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyCard>
      <MyCardHeader>
        <div className="flex items-center justify-between">
          <MyCardTitle>계좌 정보</MyCardTitle>
          {hasAccount && !isEditing && (
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                수정
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </MyCardHeader>
      <MyCardContent>
        {!hasAccount || isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">은행</label>
                <Input
                  value={accountInfo.bank ?? ""}
                  onChange={e =>
                    setAccountInfo({ ...accountInfo, bank: e.target.value })
                  }
                  placeholder="은행명을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">계좌번호</label>
                <Input
                  value={accountInfo.account ?? ""}
                  onChange={e =>
                    setAccountInfo({ ...accountInfo, account: e.target.value })
                  }
                  placeholder="계좌번호를 입력하세요"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveAccount}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? "저장 중..." : "저장"}
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    loadAccountInfo();
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{accountInfo.bank}</p>
                <p className="text-gray-600">{accountInfo.account}</p>
              </div>
            </div>
          </div>
        )}

        {!hasAccount && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            계좌 등록
          </Button>
        )}
      </MyCardContent>
    </MyCard>
  );
}
