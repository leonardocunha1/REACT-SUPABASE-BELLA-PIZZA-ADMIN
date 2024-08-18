import Button from "@/ui/Button";
import useDeleteOrder from "./useDeleteOrder";

function DeleteOrder({ orderId, nameUser, onCloseModal }) {
  const { deleteOrder, isDeleting } = useDeleteOrder();

  return (
    <div>
      <h1 className="text-center text-3xl font-bold uppercase tracking-widest text-red-500">
        Cuidado!
      </h1>
      <p className="mt-4">
        Tem certeza que deseja excluir o pedido{" "}
        <span className="font-bold">#{orderId}</span>?
      </p>
      <p className="mt-3">Dono do pedido: {nameUser}</p>
      <div className="mt-6 flex items-center justify-end gap-2">
        <Button
          variation="danger"
          onClick={() =>
            deleteOrder(orderId, {
              onSuccess: () => onCloseModal?.(),
            })
          }
          extraClasses="font-semibold"
        >
          {isDeleting ? "Deletando..." : "Deletar"}
        </Button>
        <Button onClick={onCloseModal} extraClasses="font-semibold">
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default DeleteOrder;
