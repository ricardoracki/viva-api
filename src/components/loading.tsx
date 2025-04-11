import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

const Loading = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("w-full h-full flex items-center justify-center", className)}
    {...props}
  />
);

const Spinner = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative w-4 h-4 border-2 border-zinc-100 border-l-transparent border-r-transparent animate-spin rounded-full",
      className
    )}
    {...props}
  />
);

const TreeDots = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex gap-1", className)}>
    <span className="bg-zinc-300 rounded-full h-2 w-2 animate-bounce "></span>
    <span className="bg-zinc-300 rounded-full h-2 w-2 animate-bounce "></span>
    <span className="bg-zinc-300 rounded-full h-2 w-2 animate-bounce"></span>
  </div>
);

Loading.Spinner = Spinner;
Loading.TreeDots = TreeDots;

export { Loading };
