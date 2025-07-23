"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "alarm"
  | "connect"
  | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

// 알림 타입별 아이콘
const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    case "alarm":
      return "🔔";
    case "connect":
      return "🔗";
    default:
      return "ℹ️";
  }
};

// 알림 타입별 색상
const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "border-green-200 bg-green-50 text-green-800";
    case "error":
      return "border-red-200 bg-red-50 text-red-800";
    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-800";
    case "alarm":
      return "border-purple-200 bg-purple-50 text-purple-800";
    case "connect":
      return "border-blue-200 bg-blue-50 text-blue-800";
    default:
      return "border-gray-200 bg-gray-50 text-gray-800";
  }
};

// 개별 알림 컴포넌트
export function NotificationToast({
  notification,
  onClose,
}: {
  notification: Notification;
  onClose: (id: string) => void;
}) {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, onClose]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-sm max-w-sm
        animate-in slide-in-from-right-full duration-300
        ${getNotificationColor(notification.type)}
      `}
    >
      <span className="text-lg flex-shrink-0 mt-0.5">
        {getNotificationIcon(notification.type)}
      </span>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm leading-tight">
          {notification.title}
        </h4>
        <p className="text-sm opacity-90 mt-1 leading-relaxed">
          {notification.message}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-black/10 flex-shrink-0"
        onClick={() => onClose(notification.id)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

// 알림 컨테이너
export function NotificationContainer({
  notifications,
  onClose,
}: {
  notifications: Notification[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
