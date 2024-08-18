import EditOrderItem from "@/features/orders/EditOrderItem";

function OrderItemList({ cart, handleIncrement, handleDecrement }) {
  return (
    <ul className="my-5 flex flex-col gap-2">
      {cart.length === 0 ? (
        <p className="text-center">Nenhum item adicionado</p>
      ) : (
        cart.map((item) => (
          <EditOrderItem
            key={item.uniqueId}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))
      )}
    </ul>
  );
}

export default OrderItemList;
