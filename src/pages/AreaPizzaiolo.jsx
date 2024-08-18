import PizzasArea from "@/features/areaPizzaiolo/PizzasArea";
import TableArea from "@/ui/TableArea";

function AreaPizzaiolo() {
  return (
    <TableArea>
      <h1 className="mb-5 text-3xl font-bold">Pizzas em produção</h1>
      <PizzasArea />
    </TableArea>
  );
}

export default AreaPizzaiolo;
