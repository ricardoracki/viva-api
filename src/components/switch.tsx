import { forwardRef, InputHTMLAttributes, Ref } from "react";

export type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

export const Sw = (
  { className, ...props }: SwitchProps,
  ref: Ref<HTMLInputElement>
) => (
  <span className="w-9 shrink-0 border-2 border-transparent items-center h-5 inline-flex rounded-full bg-zinc-100 relative [&:has(input:checked)_span]:translate-x-4 ">
    <input
      ref={ref}
      type="checkbox"
      className="absolute inset-0 z-10 opacity-0 cursor-pointer"
      {...props}
    />
    <span className="pointer-events-none h-4 w-4 rounded-full bg-zinc-900  transition-all ease-in-out " />
  </span>
);

export const Switch = forwardRef(Sw);
