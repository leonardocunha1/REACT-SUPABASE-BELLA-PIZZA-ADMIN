import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/ApiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      console.log(user);

      if (user.user.user_metadata.userType === "admin") {
        navigate("/dashboard", { replace: true });
      }

      if (user.user.user_metadata.userType === "user") {
        navigate("/pedidos", { replace: true });
      }
    },
    onError: (error) => {
      toast.error("E-mail ou senha inválidos");
    },
  });
  return { login, isPending };
}
