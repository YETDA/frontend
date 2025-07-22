import { Heart, User } from "lucide-react";

export const UserTypeTabs = ({ userType, setUserType }) => (
  <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
    <div className="flex bg-secondary-100 rounded-2xl p-1">
      <button
        onClick={() => setUserType("creator")}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
          userType === "creator"
            ? "bg-white text-primary-600 shadow-md"
            : "text-secondary-600 hover:text-secondary-900"
        }`}
      >
        <User className="h-4 w-4 inline mr-2" />
        창작자
      </button>
      <button
        onClick={() => setUserType("supporter")}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
          userType === "supporter"
            ? "bg-white text-primary-600 shadow-md"
            : "text-secondary-600 hover:text-secondary-900"
        }`}
      >
        <Heart className="h-4 w-4 inline mr-2" />
        후원자
      </button>
    </div>
  </div>
);
