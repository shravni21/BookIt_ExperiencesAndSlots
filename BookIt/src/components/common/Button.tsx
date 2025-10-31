import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  // base classes
  let buttonClass =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ";

  // variants
  if (variant === "primary")
    buttonClass +=
      "bg-yellow-400 text-black hover:bg-yellow-500 focus-visible:ring-yellow-400 ";
  else if (variant === "secondary")
    buttonClass +=
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400 ";
  else if (variant === "ghost")
    buttonClass +=
      "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300 ";

  // sizes
  if (size === "sm") buttonClass += "text-sm px-3 py-1.5 ";
  else if (size === "md") buttonClass += "text-sm px-4 py-2 ";
  else if (size === "lg") buttonClass += "text-base px-5 py-2.5 ";

  // block button
  if (block) buttonClass += "w-full ";

  // custom className from parent (optional)
  buttonClass += className;

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-black"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
