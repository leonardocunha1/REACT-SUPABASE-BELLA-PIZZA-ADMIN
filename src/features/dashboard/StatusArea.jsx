import { formatCurrency } from "@/utils/helpers";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import StatusCard from "./StatusCard";

function StatusArea({ orders, isOrdering }) {
  const totalVendas = orders
    .filter((order) => order.status !== "cancelado")
    .reduce((acc, order) => {
      return (
        acc +
        order.order_items.reduce(
          (itemAcc, item) => itemAcc + item.priceUnity * item.quantity,
          0,
        )
      );
    }, 0);

  const quantidadeVendas = orders.filter(
    (order) => order.status !== "cancelado",
  ).length;

  const pedidosCancelados = orders.length - quantidadeVendas;
  const valorMedioPorPedido =
    quantidadeVendas > 0 ? totalVendas / quantidadeVendas : 0;

  return (
    <div className="grid grid-cols-1 place-content-center place-items-center gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatusCard
        title="Pedidos completos"
        icon={<TfiShoppingCartFull />}
        value={quantidadeVendas}
        isLoading={isOrdering}
        bgColor="bg-blue-200"
        iconColor="text-blue-500"
      />
      <StatusCard
        title="Pedidos cancelados"
        icon={<MdOutlineCancel />}
        value={pedidosCancelados}
        isLoading={isOrdering}
        bgColor="bg-red-200"
        iconColor="text-red-500"
      />
      <StatusCard
        title="Total vendido"
        icon={<TbPigMoney />}
        value={formatCurrency(totalVendas)}
        isLoading={isOrdering}
        bgColor="bg-green-200"
        iconColor="text-green-500"
      />
      <StatusCard
        title="Valor médio por pedido"
        icon={<FaMoneyBillTransfer />}
        value={formatCurrency(valorMedioPorPedido)}
        isLoading={isOrdering}
        bgColor="bg-purple-200"
        iconColor="text-purple-500"
      />
    </div>
  );
}

export default StatusArea;
