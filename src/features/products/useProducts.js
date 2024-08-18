import { getProducts } from "@/services/ApiProducts";
import { useQuery } from "@tanstack/react-query";

function useProducts() {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return {
    products,
    error,
    isPending,
  };
}

export default useProducts;
