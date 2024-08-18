import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct as createProductAPI } from "@/services/ApiProducts";
import { toast } from "react-toastify";

function useCreateEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createProductAPI(newProductData, id),
    onSuccess: () => {
      toast.success("Produto criado/editado com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      //   console.error(err);
    },
  });

  return { createProduct, isCreating };
}

export default useCreateEditProduct;
