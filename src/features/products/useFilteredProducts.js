import useOrderedItems from "@/hooks/useOrderedItems";
import { useSearchParams } from "react-router-dom";

function useFilteredProducts(products) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tipoProduto = searchParams.get("tabFilter") || "Todos";
  const orderBy = searchParams.get("selectOrder") || "normal";

  const cardapioOrdenado = useOrderedItems(products);

  const produtosFiltrados =
    tipoProduto === "Todos"
      ? cardapioOrdenado
      : products.filter((product) => product.category === tipoProduto);

  let produtosOrdenados;
  switch (orderBy) {
    case "preco-asc":
      produtosOrdenados = produtosFiltrados.sort((a, b) => a.price - b.price);
      break;
    case "preco-desc":
      produtosOrdenados = produtosFiltrados.sort((a, b) => b.price - a.price);
      break;
    case "nome-az":
      produtosOrdenados = produtosFiltrados.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      break;
    case "nome-za":
      produtosOrdenados = produtosFiltrados.sort((a, b) =>
        b.name.localeCompare(a.name),
      );
      break;
    default:
      produtosOrdenados = produtosFiltrados;
  }

  return produtosOrdenados;
}

export default useFilteredProducts;
