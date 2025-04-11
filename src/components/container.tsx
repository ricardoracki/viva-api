import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  center?: boolean;
};

export const Container = ({
  className,
  asChild,
  center = false,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "h-screen bg-background overfllow-auto",
        { "flex items-center justify-center": center },
        className
      )}
      {...props}
    />
  );
};
