export const Button = ({
  variant = "primary",
  label = "",
  className,
  isLoading = false,
  type = "button",
  disabled = false,
  ...props
}: {
  variant?: "primary" | "secondary" | "danger";
  label?: string;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  const variants = {
    primary:
      "text-preset-7 font-medium py-3 px-8 rounded-[10px] bg-blue-600 text-neutral-0 hover:bg-blue-700 focus:outline-none ",
    secondary:
      "text-preset-7 text-primary-text px-4 py-2 rounded-[8px] border border-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-500 focus:outline-none ",
    danger:
      "text-preset-7 font-medium py-3 px-8 rounded-[10px] bg-red-600 text-neutral-0 hover:bg-red-700 focus:outline-none transition-all ",
  };

  return (
    <button
      className={`${variants[variant]} ${className} ${
        isLoading ? "cursor-not-allowed !h-[45px]" : ""
      }`}
      disabled={isLoading || disabled}
      type={type}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-100 [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60 [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-30"></div>
          </div>
        </div>
      ) : (
        label
      )}
    </button>
  );
};
