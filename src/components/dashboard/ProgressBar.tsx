
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: "primary" | "secondary" | "destructive" | "success";
  backgroundColor?: "primary" | "secondary" | "destructive" | "success" | "muted";
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  color = "primary",
  backgroundColor = "secondary",
  animated = true,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-secondary";
      case "destructive":
        return "bg-destructive";
      case "success":
        return "bg-green-500";
      case "muted":
        return "bg-muted";
      default:
        return "bg-primary";
    }
  };

  return (
    <div
      className={cn(`w-full ${getColorClass(backgroundColor)} rounded-full overflow-hidden`)}
      style={{ height: `${height}px` }}
    >
      <div
        className={cn(`${getColorClass(color)} h-full rounded-full`, animated && "transition-all duration-700")}
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
