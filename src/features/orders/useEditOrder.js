import { atualizarOrderItems } from "@/services/ApiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useEditOrder() {
  const queryClient = useQueryClient();

  const { mutate: editOrder, isPending: isEditingOrder } = useMutation({
    mutationFn: ({ order, items, troco, valEntrega }) =>
      atualizarOrderItems(order, items, troco, valEntrega),
    onSuccess: () => {
      toast.success("Pedido atualizado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      //   console.error(err);
    },
  });
  return { editOrder, isEditingOrder };
}

export default useEditOrder;
