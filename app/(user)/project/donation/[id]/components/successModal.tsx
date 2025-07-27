import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  amount: number;
}

export default function SuccessModal({
  isOpen,
  onClose,
  projectTitle,
  amount,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center">
          {/* 성공 아이콘 */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">후원 완료!</h3>

          <div className="text-gray-600 mb-6">
            <p className="mb-3">
              <span className="font-bold text-blue-600">
                {amount.toLocaleString()}원
              </span>{" "}
              후원이 완료되었습니다.
            </p>
            <p className="text-sm">
              창작자의 도전을 응원해주셔서 감사합니다! 리워드는 이메일로
              발송됩니다.
            </p>
          </div>

          {/* 프로젝트 정보 */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              후원한 프로젝트
            </h4>
            <div className="text-sm text-gray-600">{projectTitle}</div>
          </div>

          {/* 버튼 */}
          <Button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 rounded-2xl font-semibold"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
