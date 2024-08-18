import TableProducts from "@/features/products/TableProducts";
import { useUser } from "@/features/users/useUser";
import SemPermissao from "@/ui/SemPermissao";
import TableArea from "@/ui/TableArea";
import TableOperations from "@/ui/TableOperations";
import { Loader } from "lucide-react";
import { useState } from "react";

function Produtos() {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, isPending } = useUser();

  if (user.user_metadata.userType !== "admin") {
    return <SemPermissao />;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <TableArea>
      <TableOperations
        setCurrentPage={setCurrentPage}
        label="Produtos"
        filterOptions={[
          { label: "Todos", value: "Todos" },
          { label: "Pizzas", value: "Pizza" },
          { label: "Bebidas", value: "Bebida" },
          { label: "Sobremesas", value: "Sobremesa" },
        ]}
        selectOptions={[
          { label: "Normal", value: "normal" },
          { label: "Preço (↑)", value: "preco-asc" },
          { label: "Preço (↓)", value: "preco-desc" },
          { label: "Nome (A-Z)", value: "nome-az" },
          { label: "Nome (Z-A)", value: "nome-za" },
        ]}
        fieldTab="tabFilter"
        fieldSelect="selectOrder"
      />
      <TableProducts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </TableArea>
  );
}

export default Produtos;
