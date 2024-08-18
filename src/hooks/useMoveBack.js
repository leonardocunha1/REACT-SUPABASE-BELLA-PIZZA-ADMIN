import { useNavigate } from "react-router-dom";

function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

export default useMoveBack;
