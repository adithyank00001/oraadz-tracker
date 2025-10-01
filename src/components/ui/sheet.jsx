import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../lib/utils.js";

function Sheet({ ...props }) {
  return (
    <AnimatePresence>
      <SheetPrimitive.Root data-slot="sheet" {...props} />
    </AnimatePresence>
  );
}

function SheetTrigger({ ...props }) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }) {
  return (
    <SheetPrimitive.Overlay asChild>
      <motion.div
        data-slot="sheet-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        {...props}
      />
    </SheetPrimitive.Overlay>
  );
}

function SheetContent({ className, children, side = "right", ...props }) {
  const getSlideAnimation = (side) => {
    switch (side) {
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "right":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
      case "top":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "bottom":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
      default:
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
    }
  };

  const slideAnimation = getSlideAnimation(side);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content asChild>
        <motion.div
          data-slot="sheet-content"
          className={cn(
            "bg-background/95 backdrop-blur-md fixed z-50 flex flex-col gap-4 shadow-xl border",
            side === "right" &&
              "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            side === "left" &&
              "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            side === "top" && "inset-x-0 top-0 h-auto border-b",
            side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
            className
          )}
          initial={slideAnimation.initial}
          animate={slideAnimation.animate}
          exit={slideAnimation.exit}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
            duration: 0.3,
          }}
          {...props}
        >
          {children}
          <SheetPrimitive.Close className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-all duration-200 hover:opacity-100 hover:bg-accent focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </motion.div>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
