import { Outlet } from "react-router-dom";
import MenuItens from "./Sidebar/MenuItens";
import Logo from "./Sidebar/Logo";

function AppLayout() {
  return (
    // retirei o min-h-screen e coloquei o h-screen para funcionar o scroll
    <div className="relative flex h-screen flex-col bg-stone-100 font-[Poppins] text-sm text-stone-800 sm:flex-row">
      <aside className="z-20 flex h-[88px] w-full border-b border-stone-300 sm:h-auto sm:w-60">
        <Logo />
        <MenuItens />
      </aside>

      <main className="relative z-10 flex flex-1 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
