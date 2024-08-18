import { fetchCepData } from "@/services/ApiCreateOrder";
import { useForm } from "react-hook-form";
import ResumoEndereco from "./ResumoEndereco";
import { useState } from "react";
import Button from "@/ui/Button";

function EnderecoForm({ cepError, cepData, setCepError, setCepData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit({ cep, numero }) {
    setIsLoading(true);
    const { data, error } = await fetchCepData(cep, numero);
    setIsLoading(false);
    if (error) {
      setCepError(error);
      setCepData(null);
    } else {
      setCepData(data);
      setCepError(null);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
      <input
        type="text"
        id="cep"
        name="cep"
        disabled={isLoading}
        placeholder="Digite seu CEP"
        {...register("cep", {
          required: "Campo obrigatório",
          pattern: {
            value: /^[0-9]{8}$/,
            message: "CEP inválido",
          },
        })}
        className="mt-4 w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
      />
      {errors.cep && (
        <p className="text-sm text-red-500">{errors.cep.message}</p>
      )}
      {cepError && <p className="text-sm text-red-500">{cepError}</p>}
      <input
        type="number"
        id="numero"
        name="numero"
        disabled={isLoading}
        placeholder="Número da casa"
        {...register("numero", {
          required: "Campo obrigatório",
          min: {
            value: 1,
            message: "Número inválido",
          },
        })}
        className="mt-2 w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
      />
      {errors.numero && (
        <p className="text-sm text-red-500">{errors.numero.message}</p>
      )}
      <Button
        disabled={isLoading}
        variation="secondary"
        extraClasses="w-full mt-4 font-semibold tracking-wider"
      >
        {isLoading ? "Buscando CEP..." : "Buscar CEP"}
      </Button>
      {cepData && <ResumoEndereco cepData={cepData} />}
    </form>
  );
}

export default EnderecoForm;
