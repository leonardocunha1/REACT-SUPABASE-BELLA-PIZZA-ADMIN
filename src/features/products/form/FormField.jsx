function FormField({ label, id, errors, children, type }) {
  if (type === "checkbox") {
    return (
      <div className="b-4 mt-2 flex items-center gap-2 sm:mb-0 sm:gap-4">
        <label htmlFor={id} className="block text-sm font-bold text-stone-700">
          {label}
        </label>
        {children}
      </div>
    );
  }

  return (
    <div className="b-4 flex flex-col gap-2 sm:mb-0 sm:flex-row sm:items-center sm:gap-4">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-stone-700 sm:w-20"
      >
        {label}
      </label>
      {children}
      {errors[id] && (
        <p className="text-xs italic text-orange-500">{errors[id].message}</p>
      )}
    </div>
  );
}

export default FormField;
