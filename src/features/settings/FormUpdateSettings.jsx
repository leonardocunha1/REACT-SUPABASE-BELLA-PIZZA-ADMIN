import { useState } from "react";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";
import InputFieldSettings from "./InputFieldSettings";
import Loader from "@/ui/Loader";

function FormUpdateSettings() {
  const { settings = {}, isPending } = useSettings();
  const { entrega, tempoEspera, bordaPrice } = settings;
  const { updateSettings, isUpdatingSettings } = useUpdateSettings();

  const [errors, setErrors] = useState({
    entrega: "",
    tempoEspera: "",
    bordaPrice: "",
  });

  function handleUpdate(event, colunaTabela) {
    const { value: valor } = event.target;

    if (valor <= 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [colunaTabela]: "O valor deve ser maior que 1.",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [colunaTabela]: "",
    }));

    updateSettings({ [colunaTabela]: valor });
  }

  if (isPending) return <Loader isLoading={isPending} />;

  return (
    <div className="mt-5 w-full max-w-2xl rounded-lg border bg-stone-50 p-6 shadow-md">
      <h1 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
        Configurações ⚙
      </h1>
      <form>
        <InputFieldSettings
          id="val-entrega"
          label="Valor entrega (R$)"
          defaultValue={entrega}
          onBlur={(event) => handleUpdate(event, "entrega")}
          disabled={isUpdatingSettings}
          error={errors.entrega}
        />

        <InputFieldSettings
          id="tempo-espera"
          label="Tempo de espera (minutos)"
          defaultValue={tempoEspera}
          onBlur={(event) => handleUpdate(event, "tempoEspera")}
          disabled={isUpdatingSettings}
          error={errors.tempoEspera}
        />

        <InputFieldSettings
          id="preco-borda"
          label="Preço da borda (R$)"
          defaultValue={bordaPrice}
          onBlur={(event) => handleUpdate(event, "bordaPrice")}
          disabled={isUpdatingSettings}
          error={errors.bordaPrice}
        />
      </form>
    </div>
  );
}

export default FormUpdateSettings;
