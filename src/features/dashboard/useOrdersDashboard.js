import { getOrders } from "@/services/ApiOrders";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useOrdersDashBoard() {
  const [searchParams] = useSearchParams();

  const dateValue = searchParams.get("date") || "week";

  const dateMap = {
    today: 0,
    week: 7,
    month: 30,
    semestre: 180,
    year: 365,
  };

  const date = !dateValue ? null : { field: "date", value: dateMap[dateValue] };

  const page = null;
  const status = null;

  const {
    data: { data: orders } = {},
    error,
    isPending,
  } = useQuery({
    queryKey: ["orders", date],
    queryFn: () => getOrders({ status, date, page }),
    refetchInterval: 60000,
  });

  return {
    orders,
    error,
    isPending,
  };
}

export default useOrdersDashBoard;
