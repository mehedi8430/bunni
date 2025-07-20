import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type React from "react";
import type { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type DialogModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  showButtons?: boolean;
  className?: string;
};

export function PdfDialogModal({
  isOpen,
  onOpenChange,
  title,
  children,
  onConfirm,
  confirmText = "Save",
  onCancel,
  cancelText = "Cancel",
  showButtons = false,
  className = "",
}: DialogModalProps) {
  const isMobile = useIsMobile();
  console.log({ isMobile });

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {title && (
            <DrawerHeader>
              <DrawerTitle className="border-b !pb-4 text-xl font-semibold">
                {title}
              </DrawerTitle>
            </DrawerHeader>
          )}
          <div className="h-auto max-h-[70vh] overflow-y-auto px-4 py-3">
            {children}
          </div>
          {showButtons && (
            <DrawerFooter className="flex flex-col gap-2 px-4 pb-4 sm:flex-row">
              {onCancel && (
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="w-full sm:w-auto"
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  variant="default"
                  onClick={onConfirm}
                  className="w-full sm:w-auto"
                >
                  {confirmText}
                </Button>
              )}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "my-auto w-[95%] border-none bg-transparent p-0 shadow-none sm:w-[90%] md:w-[80%] lg:!max-w-2xl",
          // Try more selectors for the close button:
          "focus:outline-none [&>button]:hidden",
          className,
        )}
      >
        <div className="aspect-square">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
