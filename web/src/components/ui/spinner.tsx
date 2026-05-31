type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  /** Controls the diameter and border width of the spinner. Defaults to "md". */
  size?: SpinnerSize;
  /** When true, renders a fixed full-screen overlay with the spinner centred. */
  fullPage?: boolean;
  /** Additional Tailwind classes for the spinner element. */
  className?: string;
  /** Accessible label announced to screen readers. Defaults to "Loading...". */
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

function Spinner({
  size = "md",
  fullPage = false,
  className = "",
  label = "Loading...",
}: SpinnerProps) {
  const arc = (
    <div
      role="status"
      aria-label={label}
      className={[
        "inline-block rounded-full animate-spin",
        "border-[var(--primary)] border-t-transparent",
        sizeMap[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {arc}
      </div>
    );
  }

  return arc;
}

export { Spinner };
