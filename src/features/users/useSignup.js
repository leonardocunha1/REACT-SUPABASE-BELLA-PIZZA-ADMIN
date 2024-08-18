import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/ApiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      //   console.log("user", user);

      toast.success(
        "Usuário cadastrado com sucesso! Verifique o e-mail para ativar a conta.",
      );
    },
  });

  return {
    signup,
    isPending,
  };
}
