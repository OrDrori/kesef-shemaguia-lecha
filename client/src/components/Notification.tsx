import { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // Auto-dismiss after duration (ms), 0 = no auto-dismiss
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'bg-secondary/10 border-secondary text-secondary-foreground',
  error: 'bg-destructive/10 border-destructive text-destructive-foreground',
  info: 'bg-primary/10 border-primary text-primary-foreground',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-900',
};

const iconColorMap = {
  success: 'text-secondary',
  error: 'text-destructive',
  info: 'text-primary',
  warning: 'text-yellow-600',
};

export function Notification({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);
  const Icon = iconMap[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`
        ${colorMap[type]}
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
        flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg
        min-w-[320px] max-w-[480px]
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`w-6 h-6 ${iconColorMap[type]}`} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        {message && (
          <p className="text-sm opacity-90">{message}</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        aria-label="סגור התראה"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export interface NotificationContainerProps {
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div
      className="fixed top-4 left-4 z-50 flex flex-col gap-3 pointer-events-none"
      aria-label="התראות מערכת"
    >
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Notification {...notification} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
