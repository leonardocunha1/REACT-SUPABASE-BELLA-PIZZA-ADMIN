function Button({
  size = "medium",
  variation = "primary",
  children,
  extraClasses = "",
  rounded = "sm",
  ...props
}) {
  const base = `rounded-${rounded} border-none shadow-sm duration-200`;

  const sizeClasses = {
    small: "py-1 px-2",
    medium: "py-2 px-3 ",
    large: "py-4 px-5 ",
  };

  const variationClasses = {
    primary: "text-stone-800 bg-stone-200 hover:bg-stone-300",
    secondary:
      "text-stone-600 bg-orange-300 border border-orange-200 hover:bg-orange-200",
    danger: "text-red-100 bg-red-700 hover:bg-red-800",
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variationClasses[variation]} ${extraClasses}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
