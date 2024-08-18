function InputFieldSettings({
  id,
  label,
  defaultValue,
  onBlur,
  disabled,
  error,
}) {
  return (
    <div className="mb-4 items-center sm:flex">
      <label
        className="mb-2 block w-60 text-sm font-bold text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type="number"
        id={id}
        defaultValue={defaultValue}
        className="w-full max-w-60 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        disabled={disabled}
        onBlur={onBlur}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputFieldSettings;
