import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-green-dark/15 bg-white/50 px-4 py-2 text-sm text-green-dark backdrop-blur-md transition-all duration-300 placeholder:text-[#6B5B4F]/60 focus:border-primary/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:shadow-[0_0_20px_rgba(217,122,50,0.12)] font-body",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
