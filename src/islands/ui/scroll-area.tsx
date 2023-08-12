"use client";

import { forwardRef } from "react";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { tv } from "tailwind-variants";

export const ScrollAreaStyles = {
  Root: tv({
    base: "relative overflow-hidden",
  }),
  Scrollbar: tv({
    base: "flex touch-none select-none transition-colors",
    variants: {
      orientation: {
        vertical: "h-full w-2.5 border-l border-l-transparent p-0.5",
        horizontal: "h-2.5 border-t border-t-transparent p-0.5",
      },
    },
  }),
};

const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={ScrollAreaStyles.Root({ className })}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={ScrollAreaStyles.Scrollbar({ className, orientation })}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
