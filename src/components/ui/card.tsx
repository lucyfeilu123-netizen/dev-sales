import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-0 border border-surface-200 rounded-[var(--radius-lg)] shadow-sm",
        padding && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
