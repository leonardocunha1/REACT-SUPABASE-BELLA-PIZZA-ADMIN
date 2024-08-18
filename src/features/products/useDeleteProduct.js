import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as delectProductAPI } from "@/services/ApiProducts";
import { toast } from "react-toastify";

function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: ({ idProduto, urlImg }) => delectProductAPI(idProduto, urlImg),
    onSuccess: () => {
      toast.success("Produto deletado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      toast.error("Não foi possível deletar o produto.");
    },
  });

  return { deleteProduct, isDeleting };
}

export default useDeleteProduct;
