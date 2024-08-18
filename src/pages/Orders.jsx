import TableOrders from "@/features/orders/TableOrders";
import TableArea from "@/ui/TableArea";
import TableOperations from "@/ui/TableOperations";
import { Outlet } from "react-router-dom";

function Pedidos() {
  return (
    <TableArea>
      <TableOperations
        label="Pedidos"
        filterOptions={[
          { label: "Todos", value: "all" },
          { label: "Pendentes", value: "pendente" },
          { label: "Em preparo", value: "confirmado" },
          { label: "Prontos", value: "pronto" },
          { label: "Pagos", value: "pago" },
          { label: "Cancelados", value: "cancelado" },
        ]}
        selectOptions={[
          { label: "Hoje", value: "today" },
          { label: "Semana", value: "week" },
          { label: "Mês", value: "month" },
          { label: "Ano", value: "year" },
          { label: "Todos", value: "all" },
        ]}
        fieldTab="status"
        fieldSelect="date"
      />
      <TableOrders />
      <Outlet />
    </TableArea>
  );
}

export default Pedidos;
