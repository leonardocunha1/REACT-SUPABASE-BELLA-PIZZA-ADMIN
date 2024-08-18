import { deleteOrder as deleteOrderAPI } from "@/services/ApiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: (orderId) => deleteOrderAPI(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Pedido deletado com sucesso.");
    },
    onError: (err) => {
      toast.error(err.message);
      //   console.error(err);
    },
  });

  return { deleteOrder, isDeleting };
}

export default useDeleteOrder;
