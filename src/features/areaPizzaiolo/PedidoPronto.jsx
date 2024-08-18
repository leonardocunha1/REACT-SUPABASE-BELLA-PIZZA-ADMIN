import Button from "@/ui/Button";
import useUpdateStatusOrder from "../orders/useUpdateStatusOrder";

function PedidoPronto({ onCloseModal, userName, orderId }) {
  const { isUpdating, changeStatus } = useUpdateStatusOrder();

  return (
    <div>
      <p className="mb-6 text-center text-xl">
        Deseja confirmar o pedido do cliente{" "}
        <span className="font-bold">{userName}</span> como pronto?
      </p>
      <div className="flex justify-end gap-2">
        <Button
          variation="danger"
          extraClasses="w-full font-semibold"
          onClick={() =>
            changeStatus(
              { orderId, status: "pronto" },
              {
                onSuccess: () => {
                  onCloseModal?.();
                },
              },
            )
          }
        >
          {isUpdating ? "Confirmando pedido..." : "Sim"}
        </Button>
        <Button onClick={onCloseModal} extraClasses="w-full font-semibold">
          Não
        </Button>
      </div>
    </div>
  );
}

export default PedidoPronto;
