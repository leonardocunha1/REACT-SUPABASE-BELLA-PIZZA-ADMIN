import { formatCurrency } from "@/utils/helpers";

function EditOrderItem({ item, onIncrement, onDecrement }) {
  return (
    <li className="flex items-center justify-between gap-2 border-b border-gray-300 p-2">
      <div>
        {item.products.category === "Pizza" && (
          <>
            <p className="font-semibold tracking-wide">
              {item.products.name} - {item.size} -
              {item.borda ? "Com borda" : "Sem borda"} -{" "}
              {formatCurrency(item.priceUnity)} un.
            </p>
            {item.observation && item.observation !== null && (
              <p className="italic text-stone-500">
                Observações: {item.observation}
              </p>
            )}
          </>
        )}
        {item.products.category !== "Pizza" && (
          <p className="font-semibold tracking-wide">
            {item.products.name} - {formatCurrency(item.priceUnity)} un.
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-semibold">
          {formatCurrency(item.priceUnity * item.quantity)}
        </span>
        <div className="flex items-center">
          <button
            onClick={() => onDecrement(item.uniqueId)}
            className="rounded-lg border-none bg-red-600 px-2 py-1 shadow-sm duration-200 hover:bg-red-400"
          >
            -
          </button>
          <span className="px-2 font-semibold">{item.quantity}</span>
          <button
            onClick={() => onIncrement(item.uniqueId)}
            className="rounded-lg border-none bg-green-600 px-2 py-1 shadow-sm duration-200 hover:bg-green-400"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}

export default EditOrderItem;
