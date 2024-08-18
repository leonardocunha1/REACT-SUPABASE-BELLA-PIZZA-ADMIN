import GraficoBarra from "@/features/dashboard/GraficoBarra";
import GraficoPizza from "@/features/dashboard/GraficoPizza";
import StatusArea from "@/features/dashboard/StatusArea";
import useOrdersDashBoard from "@/features/dashboard/useOrdersDashboard";

import Loader from "@/ui/Loader";
import SemPermissao from "@/ui/SemPermissao";
import TableArea from "@/ui/TableArea";
import TableOperations from "@/ui/TableOperations";

import { useUser } from "@/features/users/useUser";
import { useSearchParams } from "react-router-dom";
import GraficoOnda from "@/features/dashboard/GraficoOnda";

function Dashboard() {
  const { user, isPending } = useUser();
  const { orders = [], isPending: isOrdering } = useOrdersDashBoard();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date") || "week";

  const numDays = {
    week: 7,
    month: 30,
    semestre: 180,
  }[date];

  if (user.user_metadata.userType !== "admin") {
    return <SemPermissao />;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <TableArea>
      <TableOperations
        label="Dashboard"
        filterOptions={[
          { label: "7 dias", value: "week" },
          { label: "30 dias", value: "month" },
          { label: "180 dias", value: "semestre" },
        ]}
        fieldTab="date"
      />
      <div className="mt-6 flex flex-col gap-4">
        <StatusArea orders={orders} isOrdering={isOrdering} />
        <div className="flex flex-col gap-4 md:flex-row">
          <GraficoOnda orders={orders} numDays={numDays} />
          <GraficoPizza orders={orders} />
        </div>
        <GraficoBarra orders={orders} numDays={numDays} />
      </div>
    </TableArea>
  );
}

export default Dashboard;
