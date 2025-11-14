import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ text = "טוען...", fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" aria-hidden="true" />
        <p className="mt-4 text-xl text-muted-foreground" role="status">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className="w-6 h-6 animate-spin text-primary" aria-hidden="true" />
      <span className="text-muted-foreground" role="status">
        {text}
      </span>
    </div>
  );
}
