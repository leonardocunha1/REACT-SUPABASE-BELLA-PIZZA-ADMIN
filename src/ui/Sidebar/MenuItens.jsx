import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { GiFullPizza } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { BsFillEmojiWinkFill } from "react-icons/bs";
import { BiHappyBeaming } from "react-icons/bi";

import { useLogout } from "@/features/users/useLogout";
import { useUser } from "@/features/users/useUser";

const navLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <IoHomeOutline className="h-6 w-6" />,
  },
  //   {
  //     to: "/area-garcom",
  //     label: "Área do Garçom",
  //     icon: <BiHappyBeaming className="h-6 w-6" />,
  //   },
  {
    to: "/area-pizzaiolo",
    label: "Área do Pizzaiolo",
    icon: <BsFillEmojiWinkFill className="h-6 w-6" />,
  },
  {
    to: "/criarpedido",
    label: "Criar Pedido",
    icon: <FaCartPlus className="h-6 w-6" />,
  },
  {
    to: "/pedidos",
    label: "Pedidos",
    icon: <LuShoppingCart className="h-6 w-6" />,
  },
  {
    to: "/produtos",
    label: "Produtos",
    icon: <GiFullPizza className="h-6 w-6" />,
  },
  {
    to: "/users",
    label: "Usuários",
    icon: <CiUser className="h-6 w-6" />,
  },
  {
    to: "/settings",
    label: "Configurações",
    icon: <IoSettingsOutline className="h-6 w-6" />,
  },
];

function MenuItens() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { logout, isPending } = useLogout();
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // console.log("Logout acionado");
    logout();
  };

  // Filtra os links com base no tipo de usuário
  const filteredNavLinks =
    user?.user_metadata.userType === "user"
      ? [
          {
            to: "/area-pizzaiolo",
            label: "Área do Pizzaiolo",
            icon: <BsFillEmojiWinkFill className="h-6 w-6" />,
          },
          {
            to: "/criarpedido",
            label: "Criar Pedido",
            icon: <FaCartPlus className="h-6 w-6" />,
          },
          {
            to: "/pedidos",
            label: "Pedidos",
            icon: <LuShoppingCart className="h-6 w-6" />,
          },
        ]
      : navLinks;

  return (
    <div className="flex h-full w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-8 top-6 z-50 cursor-pointer text-3xl transition-transform duration-300 ease-in-out sm:hidden"
      >
        {isOpen ? <IoClose size="30px" /> : <RiMenu3Fill size="30px" />}
      </div>
      <div
        ref={menuRef}
        className={`absolute left-0 z-50 mt-[88px] w-full gap-3 bg-stone-50 px-3 py-10 shadow-lg transition-all duration-500 ease-in sm:static sm:z-auto sm:mt-0 sm:flex sm:border-r sm:border-stone-300 sm:bg-orange-300 sm:pb-0 sm:pt-40 sm:shadow-none ${
          isOpen ? "top-0" : "top-[-590px]"
        }`}
      >
        <nav className="w-full">
          <ul className="flex w-full flex-col gap-y-3 sm:items-center">
            {filteredNavLinks.map((link) => (
              <li
                key={link.to}
                className="w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-2 rounded-xl p-2 tracking-wider transition-all duration-200 hover:bg-stone-200 ${
                      isActive ? "bg-stone-200" : "text-stone-900"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="bottom-3 left-3 ml-1 mt-3 flex cursor-pointer items-center gap-2 rounded-xl p-2 tracking-wider text-stone-900 duration-200 hover:bg-stone-200 sm:absolute sm:mr-5 sm:p-0 sm:hover:bg-transparent sm:hover:text-orange-400"
          onClick={handleLogout}
        >
          <TbLogout className="h-6 w-6" />
          <p>Sair</p>
        </div>
      </div>
    </div>
  );
}

export default MenuItens;
