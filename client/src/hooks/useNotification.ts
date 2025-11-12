import { useState, useCallback } from 'react';
import type { NotificationProps, NotificationType } from '@/components/Notification';

let notificationId = 0;

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = `notification-${++notificationId}`;
    
    const notification: NotificationProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: (id) => removeNotification(id),
    };

    setNotifications((prev) => [...prev, notification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const success = useCallback((title: string, message?: string, duration?: number) => {
    return addNotification('success', title, message, duration);
  }, [addNotification]);

  const error = useCallback((title: string, message?: string, duration?: number) => {
    return addNotification('error', title, message, duration);
  }, [addNotification]);

  const info = useCallback((title: string, message?: string, duration?: number) => {
    return addNotification('info', title, message, duration);
  }, [addNotification]);

  const warning = useCallback((title: string, message?: string, duration?: number) => {
    return addNotification('warning', title, message, duration);
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning,
  };
}
