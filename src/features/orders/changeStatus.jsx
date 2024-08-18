import Button from "@/ui/Button";
import StatusOrders from "./StatusOrders";
import useUpdateStatusOrder from "./useUpdateStatusOrder";

function ChangeStatus({ order, status, onCloseModal }) {
  const { changeStatus, isUpdating } = useUpdateStatusOrder();
  console.log(order);

  return (
    <div className="pt-6 text-sm">
      <h3 className="text-center text-xl font-semibold">
        Pedido <span className="text-orange-500">#{order.id}</span>
      </h3>
      <div className="mt-4 flex items-center justify-center gap-1">
        <p>Atualizar para</p>
        <StatusOrders status={status} />
      </div>
      <div className="mt-7 flex justify-end gap-2">
        <Button
          onClick={() => {
            changeStatus(
              { orderId: order.id, status },
              {
                onSuccess: () => {
                  onCloseModal?.();
                },
              },
            );
          }}
        >
          Sim
        </Button>
        <Button onClick={onCloseModal}>Não</Button>
      </div>
    </div>
  );
}

export default ChangeStatus;
