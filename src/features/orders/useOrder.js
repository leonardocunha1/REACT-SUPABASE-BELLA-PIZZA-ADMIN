import { getOrder } from "@/services/ApiOrders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useOrder() {
  const { orderId } = useParams();

  const {
    isPending,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });

  return { order, isPending, error };
}

export default useOrder;
