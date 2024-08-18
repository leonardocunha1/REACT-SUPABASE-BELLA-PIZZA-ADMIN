import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/ApiSettings";
import { toast } from "react-toastify";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        toast.success("Configurações atualizadas com sucesso.");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
        console.log("Configurações atualizadas com sucesso.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  return { updateSettings, isUpdatingSettings };
}

export default useUpdateSettings;
