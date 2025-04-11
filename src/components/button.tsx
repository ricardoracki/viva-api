import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";
import { Loading } from "./loading";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "primary" | "danger" | "link";
  size?: "default" | "icon";
  loading?: boolean;
};

const Ld = (
  <Loading>
    <Loading.Spinner />
  </Loading>
);

export const Button = ({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <button
    disabled={disabled || loading}
    children={loading ? Ld : children}
    className={cn(
      "transition-all ease-in-out cursor-pointer opacity-90 hover:opacity-100 rounded-md flex items-center justify-center h-9",
      {
        "bg-zinc-900 text-text hover:bg-zinc-700": variant === "default",
        " text-text hover:bg-zinc-200/5 border border-zinc-300":
          variant === "outline",
        "bg-transparent text-text": variant === "ghost",
        "bg-transparent text-text hover:underline": variant === "link",
        "bg-purple-500 text-text hover:bg-purple-600": variant === "primary",
        "bg-red-600 text-text hover:bg-red-500": variant === "danger",
        "py-2 rounded-md w-full": size === "default",
        "w-9 ": size === "icon",
        "pointer-events-none": loading || disabled,
      },
      className
    )}
    {...props}
  />
);
