import { useEffect, useState } from "react";

import useProducts from "../products/useProducts";
import useOrder from "./useOrder";

import Empty from "@/ui/Empty";
import Loader from "@/ui/Loader";
import TableArea from "@/ui/TableArea";
import Button from "@/ui/Button";

import EditOrderItem from "./EditOrderItem";
import useMoveBack from "@/hooks/useMoveBack";
import AddItem from "./AddItem";

import { FaCartPlus } from "react-icons/fa";
import useEditOrder from "./useEditOrder";
import { formatCurrency } from "@/utils/helpers";

function EditOrder() {
  const [items, setItems] = useState([]);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [troco, setTroco] = useState(null);

  const moveback = useMoveBack();

  const { products = [], isPending } = useProducts();
  const { isPending: orderLoader, order = [] } = useOrder();
  const { editOrder, isEditingOrder } = useEditOrder();

  const valorEntrega =
    order?.finalPrice -
    order?.order_items?.reduce(
      (acc, item) => acc + item.priceUnity * item.quantity,
      0,
    );

  const total =
    items.reduce((acc, item) => acc + item.priceUnity * item.quantity, 0) +
    (order.deliveryType === "entrega" ? valorEntrega : 0);

  useEffect(() => {
    if (order?.order_items) {
      const updatedItems = order.order_items.map((item) => {
        // Adicionar uniqueId se não existir
        if (!item.uniqueId) {
          const uniqueId = `${item.products.id}-${item.size}-${item.borda}-${item.observation || ""}`;
          return { ...item, uniqueId };
        }
        return item;
      });

      setItems(updatedItems);
    }

    if (order?.paymentMethod === "dinheiro") {
      setTroco(order.changeFor === null ? 0 : order.changeFor);
    }
  }, [order]);

  const handleIncrement = (uniqueId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrement = (uniqueId) => {
    setItems((prevItems) =>
      prevItems.flatMap((item) =>
        item.uniqueId === uniqueId
          ? item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
            : []
          : [item],
      ),
    );
  };

  if (isPending || orderLoader) {
    return <Loader isLoading={isPending || orderLoader} />;
  }

  if (order.length === 0) return <Empty resourceName="Pedido" />;

  return (
    <TableArea>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="pt-7 text-xl font-semibold text-stone-800 sm:pt-0">
          Pedido #{order.id}
        </h3>
        <p
          className="absolute right-2 top-3 cursor-pointer text-base sm:static"
          onClick={moveback}
        >
          <span>&larr;</span> Voltar
        </p>
      </div>
      <ul className="my-5 flex flex-col gap-2">
        {items?.map((item) => (
          <EditOrderItem
            key={item.uniqueId}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </ul>
      {order.paymentMethod === "dinheiro" && (
        <div className="mb-5 flex gap-2">
          <label htmlFor="troco" className="italic text-stone-500">
            Alterar troco em R$
          </label>
          <input
            type="number"
            id="troco"
            value={troco}
            onChange={(e) => setTroco(e.target.value)}
            className="w-14 bg-stone-50 text-center"
          />
        </div>
      )}
      <div className="mb-4 flex flex-col items-end gap-2">
        {order.deliveryType === "entrega" && (
          <p>Entrega: {formatCurrency(valorEntrega)}</p>
        )}
        <p>Total: {formatCurrency(total)}</p>
      </div>

      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <Button
          onClick={() => setIsItemsOpen(!isItemsOpen)}
          extraClasses="flex gap-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isEditingOrder}
        >
          <FaCartPlus /> Adicionar item
        </Button>

        <Button
          onClick={() =>
            editOrder({ order, items, troco, valEntrega: valorEntrega })
          }
          disabled={isEditingOrder}
          extraClasses="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditingOrder ? "Finalizando..." : "Finalizar alterações"}
        </Button>
      </div>
      {isItemsOpen && (
        <AddItem products={products} items={items} setItems={setItems} />
      )}
    </TableArea>
  );
}

export default EditOrder;
