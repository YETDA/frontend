"use client";

import { NotificationContainer } from "./NotificationUI";
import { useNotification } from "./NotificationContext";

export default function NotificationContainerWrapper() {
  const { notifications, removeNotification } = useNotification();

  return (
    <NotificationContainer
      notifications={notifications}
      onClose={removeNotification}
    />
  );
}
