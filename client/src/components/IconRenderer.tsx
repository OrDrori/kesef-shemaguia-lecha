import { Briefcase, Home, User, GraduationCap, Baby, X, Building, Pill, Minus } from "lucide-react";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

export default function IconRenderer({ iconName, className = "w-12 h-12" }: IconRendererProps) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Briefcase,
    Home,
    User,
    GraduationCap,
    Baby,
    X,
    Building,
    Pill,
    Minus
  };

  const IconComponent = icons[iconName];
  
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}
