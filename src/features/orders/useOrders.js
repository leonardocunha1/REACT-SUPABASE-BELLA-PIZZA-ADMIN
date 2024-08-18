import { getOrders } from "@/services/ApiOrders";
import { PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filtrar por status do pedido
  const statusValue = searchParams.get("status");
  const status =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };

  // Filtrar por data do pedido
  const dateValue = searchParams.get("date");

  const dateMap = {
    today: 0,
    week: 7,
    month: 30,
    semestre: 180,
    year: 365,
  };

  const date =
    !dateValue || dateValue === "all"
      ? null
      : { field: "date", value: dateMap[dateValue] };

  // Paginação
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: orders, count } = {},
    error,
    isPending,
  } = useQuery({
    queryKey: ["orders", status, date, page],
    queryFn: () => getOrders({ status, date, page }),
    refetchInterval: 60000, // Refetch a cada 60 segundos
    // keepPreviousData: true, // Mantém dados antigos durante a transição
  });

  // PRE-FETCHING
  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["orders", status, date, page + 1],
        queryFn: () => getOrders({ status, date, page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["orders", status, date, page - 1],
        queryFn: () => getOrders({ status, date, page: page - 1 }),
      });
  }

  return {
    orders,
    count,
    error,
    isPending,
  };
}

export default useOrders;
