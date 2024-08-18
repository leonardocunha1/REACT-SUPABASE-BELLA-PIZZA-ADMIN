import { getOrdersStatusConfirmado } from "@/services/ApiOrders";
import { useQuery } from "@tanstack/react-query";

function useGetConfirmedOrders() {
  const { data: confirmedOrders, isPending } = useQuery({
    queryKey: ["confirmedOrders"],
    queryFn: getOrdersStatusConfirmado,
    refetchInterval: 60000, // Refetch a cada 60 segundos
  });

  return { confirmedOrders, isPending };
}

export default useGetConfirmedOrders;
