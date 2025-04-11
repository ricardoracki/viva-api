import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  horizontal?: boolean;
};

export const Separator = ({
  className,
  horizontal = false,
  ...props
}: SeparatorProps) => (
  <div
    className={cn(
      "bg-zinc-600 rounded-full opacity-50",
      {
        "w-full h-[1px] mt-6 mb-3": !horizontal,
        "w-[1px] h-full mx-6": horizontal,
      },
      className
    )}
    {...props}
  />
);
