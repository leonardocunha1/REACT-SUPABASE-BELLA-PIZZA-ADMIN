import { ClipLoader } from "react-spinners";

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <ClipLoader color={"#e68a21"} loading={isLoading} size={80} />
    </div>
  );
}

export default Loader;
