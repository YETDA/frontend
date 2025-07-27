import { Button } from "@/components/ui/button";

interface SupportConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedReward: string | null;
  rewards: Array<{
    id: string;
    name: string;
    amount: number;
    description: string;
    deliveryMethod: string;
    currentQuantity: number;
    maxQuantity: number;
  }>;
}

export default function SupportConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  selectedReward,
  rewards,
}: SupportConfirmModalProps) {
  // 사용되지 않은 props 예시 추가

  if (!isOpen) return null;

  const selectedRewardInfo = selectedReward
    ? rewards.find(r => r.id === selectedReward)
    : null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center">
          {/* 경고 아이콘 */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">후원 확인</h3>

          <div className="text-gray-600 mb-6 space-y-3">
            <p className="font-semibold text-red-600">후원은 환불되지 않아요</p>
            <p className="text-sm leading-relaxed">
              후원금 500원은 창작자의 도전을 응원하는 의미로 사용되며, 즉시 결제
              처리됩니다. 리워드는 응원의 증표로 제공되며, 교환/환불은
              불가합니다.
            </p>
          </div>

          {/* 선택된 리워드 표시 */}
          {selectedRewardInfo && (
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <h4 className="font-semibold text-blue-700 mb-2">
                선택된 리워드
              </h4>
              <div className="text-sm text-blue-600">
                {selectedRewardInfo.name}
              </div>
              <div className="text-xs text-blue-500 mt-1">
                {selectedRewardInfo.amount.toLocaleString()}원
              </div>
            </div>
          )}

          {/* 버튼 그룹 */}
          <div className="flex space-x-4">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 rounded-2xl bg-transparent"
            >
              더 고민해볼게요
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-2xl font-semibold text-white"
            >
              네!(결제창 넘김)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
