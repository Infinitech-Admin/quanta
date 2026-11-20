"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-forest-vivid/80 text-cream hover:bg-forest-light/70 focus-visible:ring-forest",
        outline:
          "border border-white/50 bg-white/20 backdrop-blur-md text-cream hover:bg-white/30 hover:border-white/70 shadow-lg",
        ghost: "hover:bg-forest/10 text-forest focus-visible:ring-forest",
        light: "bg-forest-vivid/40 border border-white/50 hover:bg-forest/10 text-forest focus-visible:ring-forest",
        sun: "bg-sun text-forest-deep hover:bg-sun-light focus-visible:ring-sun",
        accent:
          "bg-forest-deep text-cream border border-sun/60 hover:bg-forest hover:border-sun shadow-md focus-visible:ring-sun",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };