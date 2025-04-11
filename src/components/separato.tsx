import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

export const Separator = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "w-full bg-zinc-600 h-0.5 roudend-full mb-6 mt-16",
      className
    )}
  />
);
