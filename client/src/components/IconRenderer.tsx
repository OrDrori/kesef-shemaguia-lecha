// Version: 3.2.3 - Force rebuild via GitHub push
import { Briefcase, Home, User, GraduationCap, Baby, X, Building, Pill, Minus, Coins, Apple, Scale, AlertCircle, Lightbulb, Bus, Landmark } from "lucide-react";

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
    Minus,
    Coins,
    Apple,
    Scale,
    AlertCircle,
    Lightbulb,
    Bus,
    Landmark
  };

  const IconComponent = icons[iconName];
  
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}
