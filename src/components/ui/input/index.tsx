import { Info } from "lucide-react";

interface Props {
  label?: string;
  linkComponent?: React.ReactNode | null;
  preIcon?: React.ReactNode | null;
  postIcon?: React.ReactNode | null;
  hintIcon?: React.ReactNode | null;
  hint?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  registerProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Input = ({
  label = "Label",
  linkComponent = null,
  preIcon = null,
  postIcon = null,
  hintIcon = null,
  hint = "",
  error = "",
  placeholder = "",
  type = "text",
  registerProps = {},
}: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="text-primary-text text-preset-7">{label && label}</div>
        {linkComponent && linkComponent}
      </div>

      <div
        className={` flex items-center gap-2 py-3 px-4 rounded-lg border shadow-sm w-full hover:bg-neutral-50 dark:hover:bg-neutral-900   transition-all duration-200 ease-in-out focus-within:hover:bg-transparent dark:bg-none dark:shadow-none ${
          error
            ? "border-red-500"
            : "focus-within:border-neutral-950 focus-within:ring-neutral-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-50 focus-within:ring-2 border-neutral-300 dark:focus-within:ring-neutral-700 dark:focus-within:ring-offset-neutral-950 dark:focus-within:border-neutral-600 dark:border-neutral-600"
        }`}
      >
        {/* Pre icon  */}
        {preIcon && preIcon}
        <input
          placeholder={placeholder}
          className="placeholder:text-neutral-300 dark:placeholder:text-neutral-600  w-full outline-none text-primary-text text-preset-6"
          type={type}
          {...registerProps}
        />
        {postIcon && postIcon}
      </div>

      <div>
        {hint && (
          <div className="flex items-center gap-2 text-neutral-600">
            {hintIcon || <Info className="w-4 h-4 text-neutral-600" />}
            <span className="text-preset-5 ">{hint && hint}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500">
            {<Info className="w-4 h-4 text-red-500" />}
            <span className="text-preset-5 ">{error && error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
