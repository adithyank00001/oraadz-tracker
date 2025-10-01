import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ConfirmationDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive",
  icon: Icon = AlertTriangle,
}) {
  const { isDark } = useTheme();

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={`sm:max-w-md ${
          isDark ? "bg-[#171717] border-white" : "bg-white"
        }`}
      >
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  variant === "destructive"
                    ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1">
              <AlertDialogTitle
                className={`text-left ${isDark ? "text-white" : "text-black"}`}
              >
                {title}
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription
          className={`text-left mt-2 ${isDark ? "text-white" : "text-black"}`}
        >
          {description}
        </AlertDialogDescription>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-3">
          <AlertDialogCancel
            className={`mt-2 sm:mt-0 ${
              isDark
                ? "text-white hover:text-white"
                : "text-black hover:text-black"
            }`}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              variant === "destructive"
                ? `bg-red-600 hover:bg-red-700 ${
                    isDark ? "text-white" : "text-white"
                  }`
                : ""
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
