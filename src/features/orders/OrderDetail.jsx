import { formatCurrency } from "@/utils/helpers";
import useSettings from "../settings/useSettings";

function OrderDetail({ onCloseModal, item }) {
  //   console.log(item);
  //   console.log(settings);
  const valorEntrega =
    item.finalPrice -
    item.order_items.reduce(
      (acc, item) => acc + item.priceUnity * item.quantity,
      0,
    );

  return (
    <div>
      <h3 className="text-lg font-semibold">
        Pedido <span className="text-orange-500">#{item.id}</span>
      </h3>

      <ul className="mt-4 flex flex-col justify-between gap-2 text-sm">
        {item.order_items.map((orderItem) => (
          <li
            key={orderItem.id}
            className="flex flex-col justify-between border-b pb-2 sm:flex-row sm:items-center"
          >
            <div>
              {orderItem.products.category === "Pizza" && (
                <>
                  <p className="font-semibold tracking-wide">
                    {orderItem.products.name} - {orderItem.size} -{" "}
                    {orderItem.borda ? "Com borda" : "Sem borda"} (x
                    {orderItem.quantity}) -{" "}
                    {formatCurrency(orderItem.priceUnity)} un.
                  </p>
                  {orderItem.observation && orderItem.observation !== null && (
                    <p className="italic text-stone-500">
                      Observações: {orderItem.observation}
                    </p>
                  )}
                </>
              )}
              {orderItem.products.category !== "Pizza" && (
                <p className="font-semibold tracking-wide">
                  {orderItem.products.name} (x{orderItem.quantity})
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span>
                {formatCurrency(orderItem.priceUnity * orderItem.quantity)}
              </span>
            </div>
          </li>
        ))}

        <div className="ml-auto mt-3 flex flex-col items-end gap-2">
          {item.deliveryType === "entrega" && (
            <p>Entrega: {formatCurrency(valorEntrega)}</p>
          )}

          <p>
            Total: <span>{formatCurrency(item.finalPrice)}</span>
          </p>
        </div>
      </ul>
    </div>
  );
}

export default OrderDetail;
