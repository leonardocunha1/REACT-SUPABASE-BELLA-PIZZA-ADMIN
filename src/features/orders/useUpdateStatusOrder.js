import { changeStatusOrder } from "@/services/ApiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useUpdateStatusOrder() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: changeStatus } = useMutation({
    mutationFn: ({ orderId, status }) => changeStatusOrder(orderId, status),
    onSuccess: () => {
      toast.success("Status do pedido atualizado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmedOrders"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar status do pedido.");
      //   console.error(error);
    },
  });

  return { changeStatus, isUpdating };
}

export default useUpdateStatusOrder;
