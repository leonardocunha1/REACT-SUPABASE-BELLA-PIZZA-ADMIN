import { formatCurrency } from "@/utils/helpers";

function OrderSummary({ cart, deliveryType, settings, total }) {
  return (
    <div className="mb-4 flex flex-col items-end gap-2">
      {deliveryType === "entrega" && (
        <p>Entrega: {formatCurrency(settings.entrega)}</p>
      )}
      <p>Total: {formatCurrency(total)}</p>
    </div>
  );
}

export default OrderSummary;
