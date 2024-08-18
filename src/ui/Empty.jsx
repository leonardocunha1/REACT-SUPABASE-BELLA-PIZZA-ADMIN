import { NavLink } from "react-router-dom";

function Empty({ resourceName }) {
  return (
    <div className="flex w-full">
      <p className="flex w-full items-center justify-center text-2xl font-bold">
        O(A) {resourceName} não foi encontrado(a)
        <span className="text-orange-500">!</span>
      </p>
      <NavLink className="absolute left-3 top-3 text-base" to="/">
        &larr; Voltar
      </NavLink>
    </div>
  );
}

export default Empty;
