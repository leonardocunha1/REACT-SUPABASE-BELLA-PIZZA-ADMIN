function SubmitButton({ isCreating, children }) {
  return (
    <button
      type="submit"
      className="focus:shadow-outline w-full rounded bg-orange-300 px-4 py-2 font-bold text-stone-700 duration-300 hover:bg-orange-500 hover:text-stone-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-stone-700 disabled:hover:bg-orange-300"
      disabled={isCreating}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
