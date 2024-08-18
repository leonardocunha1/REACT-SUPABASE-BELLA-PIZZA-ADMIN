import { NavLink } from "react-router-dom";

function SemPermissao() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <p className="text-center text-2xl font-semibold text-red-700">
        Você não tem permissão para acessar essa página
      </p>
      <NavLink to="/pedidos" className="text-lg underline">
        Voltar
      </NavLink>
    </div>
  );
}

export default SemPermissao;
