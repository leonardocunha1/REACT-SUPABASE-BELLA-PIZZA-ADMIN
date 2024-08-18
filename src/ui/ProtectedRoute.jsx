import { useUser } from "@/features/users/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { user, isPending, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isPending],
  );

  if (isPending) {
    return <Loader isLoading={isPending} />;
  }

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
