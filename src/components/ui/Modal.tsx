import { useEffect, useRef, useCallback, ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Focus the close button when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow CSS transitions to begin
      const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap: cycle Tab / Shift+Tab within modal
  const handleModalKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    []
  );

  // Backdrop click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <>
      {/* Inject keyframe styles once */}
      <style>{`
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes modal-slide-down {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(24px) scale(0.97); }
        }

        .modal-overlay-enter { animation: modal-fade-in  220ms ease forwards; }
        .modal-overlay-exit  { animation: modal-fade-out 180ms ease forwards; }
        .modal-panel-enter   { animation: modal-slide-up   260ms cubic-bezier(0.22,1,0.36,1) forwards; }
        .modal-panel-exit    { animation: modal-slide-down 180ms ease forwards; }
      `}</style>

      {/* We always render but toggle visibility so exit animations can play.
          For simplicity (and because the spec focuses on the open state),
          we skip the unmounting animation here and simply hide when closed. */}
      {isOpen && (
        /* ── Backdrop ── */
        <div
          ref={overlayRef}
          role="presentation"
          onClick={handleOverlayClick}
          className={[
            "modal-overlay-enter",
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            // Glassmorphic overlay
            "bg-black/40 backdrop-blur-sm",
          ].join(" ")}
        >
          {/* ── Modal panel ── */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            onKeyDown={handleModalKeyDown}
            className={[
              "modal-panel-enter",
              "relative w-full",
              sizeClasses[size],
              // Glassmorphic card
              "rounded-2xl",
              "bg-white/10 dark:bg-white/5",
              "backdrop-blur-xl",
              "border border-white/20 dark:border-white/10",
              "shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
              "text-white",
            ].join(" ")}
          >
            {/* ── Header ── */}
            {title && (
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/15">
                <h2
                  id="modal-title"
                  className="text-lg font-semibold tracking-wide text-white/90"
                >
                  {title}
                </h2>
                <CloseButton ref={closeBtnRef} onClick={onClose} />
              </div>
            )}

            {/* Close button when no title */}
            {!title && (
              <CloseButton
                ref={closeBtnRef}
                onClick={onClose}
                className="absolute top-4 right-4"
              />
            )}

            {/* ── Body ── */}
            <div className="px-6 py-5 text-white/80">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Close button sub-component ── */
import { forwardRef } from "react";

interface CloseBtnProps {
  onClick: () => void;
  className?: string;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseBtnProps>(
  ({ onClick, className = "" }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Close modal"
      className={[
        "flex items-center justify-center w-8 h-8 rounded-full",
        "text-white/60 hover:text-white",
        "bg-white/0 hover:bg-white/15",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        className,
      ].join(" ")}
    >
      {/* × icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </button>
  )
);
CloseButton.displayName = "CloseButton";

export default Modal;