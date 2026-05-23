import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 font-heading",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-cta-gradient text-white shadow-lg shadow-primary/30 hover:brightness-110 hover:shadow-primary/50 hover:scale-[1.03]",
        outline:
          "border border-primary/40 bg-transparent text-cream hover:bg-primary/10 hover:border-primary",
        ghost: "text-cream hover:bg-white/5",
        glass:
          "glass-card text-cream hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
        mint:
          "glass-card-mint text-cream hover:glow-mint hover:border-mint/40",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
