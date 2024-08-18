function FilterOptions({ label, value, selected, onClick }) {
  return (
    <p
      className={`cursor-pointer rounded-lg px-1 py-2 tracking-wide duration-200 hover:bg-orange-300 ${selected && "bg-orange-300"}`}
      onClick={() => onClick(value)}
    >
      {label}
    </p>
  );
}

export default FilterOptions;
