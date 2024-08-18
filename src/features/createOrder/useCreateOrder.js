import { createOrder as createOrderAPI } from "@/services/ApiCreateOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: ({ order, orderItems }) => createOrderAPI(order, orderItems),
    onSuccess: () => {
      toast.success("Pedido criado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createOrder, isPending };
}

export default useCreateOrder;
