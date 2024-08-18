import { useForm } from "react-hook-form";

import useCreateEditProduct from "./useCreateEditProduct";
import SubmitButton from "@/ui/SubmitButton";
import FormField from "./form/FormField";

function CreatEditFormProducts({ editProduct = {}, onCloseModal }) {
  //   console.log(editProduct);
  const { createProduct, isCreating } = useCreateEditProduct();

  const { id: editId, ...editValues } = editProduct;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  function onSubmit(data) {
    const image =
      typeof data.image_url === "string" ? data.image_url : data.image_url[0];

    createProduct(
      {
        newProductData: { ...data, image_url: image },
        id: isEditSession ? editId : null,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg bg-stone-50"
    >
      <FormField label="Nome" id="name" errors={errors}>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Campo obrigatório" })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none sm:w-72"
          disabled={isCreating}
        />
      </FormField>

      <FormField label="Descrição" id="description" errors={errors}>
        <input
          type="text"
          id="description"
          {...register("description", {
            required: "Campo obrigatório",
          })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none sm:w-72"
          disabled={isCreating}
        />
      </FormField>

      <FormField label="Categoria" id="category" errors={errors}>
        <select
          id="category"
          {...register("category", { required: "Campo obrigatório" })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none sm:w-72"
          disabled={isCreating}
        >
          <option value="Pizza">Pizza</option>
          <option value="Sobremesa">Sobremesa</option>
          <option value="Bebida">Bebida</option>
        </select>
      </FormField>

      <FormField label="Preço" id="price" errors={errors}>
        <input
          type="number"
          id="price"
          {...register("price", {
            required: "Campo obrigatório",
            min: {
              value: 1,
              message: "O preço deve ser maior que 0",
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none sm:w-72"
          disabled={isCreating}
        />
      </FormField>

      <FormField label="Imagem" id="image_url" errors={errors}>
        <input
          type="file"
          id="image_url"
          accept="image/*"
          {...register("image_url", {
            required: isEditSession ? false : "This field is required",
          })}
          className="focus:shadow-outline appearance-none rounded border px-3 py-2 text-sm italic leading-tight text-stone-700 shadow focus:outline-none sm:w-72"
          disabled={isCreating}
        />
      </FormField>

      <FormField
        label="Disponibilidade"
        id="availability"
        errors={errors}
        type="checkbox"
      >
        <input
          type="checkbox"
          id="availability"
          defaultChecked={editValues?.availability ?? true}
          {...register("availability")}
          className="h-4 w-4 accent-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
          disabled={isCreating}
        />
        <p className="text-sm italic text-stone-500">Marcado: disponível</p>
      </FormField>

      <SubmitButton isCreating={isCreating}>
        {isEditSession && !isCreating && "Editar produto"}
        {isEditSession && isCreating && "Editando produto..."}
        {!isEditSession && !isCreating && "Criar produto"}
        {!isEditSession && isCreating && "Criando produto..."}
      </SubmitButton>
    </form>
  );
}

export default CreatEditFormProducts;
