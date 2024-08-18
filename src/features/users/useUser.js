import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/ApiAuth";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  //   console.log(user);
  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
}
