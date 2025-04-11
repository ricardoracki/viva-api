import { cn } from "@/utils/cn";
import Image, { ImageProps } from "next/image";
import { HTMLAttributes } from "react";

const Avatar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("w-10 h-10 rounded-full relative overflow-hidden", className)}
    {...props}
  />
);

const Fallback = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className="absolute inset-0 border border-gray-400 rounded-full flex items-center justify-center text-text text-xs "
    {...props}
  />
);

const Img = ({ className, ...props }: ImageProps) => (
  <Image
    className={cn("aspect-square w-full h-full", className)}
    {...props}
    width={40}
    height={40}
  />
);

Avatar.Fallback = Fallback;
Avatar.Image = Img;

export { Avatar };
