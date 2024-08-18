import { useState } from "react";

import { toast } from "react-toastify";

import useCreateOrder from "@/features/createOrder/useCreateOrder";
import useProducts from "@/features/products/useProducts";
import useSettings from "@/features/settings/useSettings";

import AddItem from "@/features/orders/AddItem";
import OrderItemList from "@/features/createOrder/OrderItemList";
import DeliveryMethodForm from "@/features/createOrder/DeliveryMethodForm";
import ClienteInfoForm from "@/features/createOrder/ClienteInfoForm";
import ActionButtons from "@/features/createOrder/ActionsButton";

import Loader from "@/ui/Loader";
import TableArea from "@/ui/TableArea";
import OrderSummary from "@/features/createOrder/OrderSummary";

function CriarPedido() {
  // STATES QUE CONTROLAM SE O COMPONENTE ESTÁ ABERTO OU FECHADO
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [openEndereco, setOpenEndereco] = useState(false);
  const [isInformacoesClienteOpen, setIsInformacoesClienteOpen] =
    useState(false);

  // STATES QUE CONTROLAM OS ITEMS DO CARRINHO
  const [cart, setCart] = useState([]);

  // STATES QUE CONTROLAM OS DADOS DO CLIENTE
  const [cepError, setCepError] = useState(null);
  const [cepData, setCepData] = useState(null);
  const [nomeCliente, setNomeCliente] = useState("");
  const [numMesa, setNumMesa] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [changeFor, setChangeFor] = useState("");
  const [deliveryType, setDeliveryType] = useState("retirada");

  // HOOKS QUE GERENCIAM OS QUERIES E MUTATIONS
  const { products = [], isPending } = useProducts();
  const { settings, isPending: isSettings } = useSettings();
  const { createOrder, isPending: isCreating } = useCreateOrder();

  // CALCULA O TOTAL DO PEDIDO
  const total =
    cart.reduce((acc, item) => acc + item.priceUnity * item.quantity, 0) +
    (deliveryType === "entrega" ? settings.entrega : 0);

  // FUNÇÕES QUE ADICIONAM OU REMOVEM ITENS DO CARRINHO
  const handleIncrement = (uniqueId) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrement = (uniqueId) => {
    setCart((prevItems) =>
      prevItems.flatMap((item) =>
        item.uniqueId === uniqueId
          ? item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
            : []
          : [item],
      ),
    );
  };

  // FUNÇÃO QUE CRIA O PEDIDO
  function handleCreateOrder(e) {
    e.preventDefault();

    if (deliveryType === "entrega" && !cepData) {
      toast.error("Pedidos com entrega devem ter o CEP preenchido");
      return;
    }

    if (cart.length === 0) {
      toast.error("Adicione itens ao pedido");
      return;
    }

    if (nomeCliente === "") {
      toast.error("Preencha o nome do cliente");
      return;
    }

    if (changeFor < 0 && paymentMethod === "dinheiro") {
      toast.error("Troco não pode ser negativo");
      return;
    }

    if (numMesa === "" && deliveryType === "local") {
      toast.error("Preencha o número da mesa para consumo local");
      return;
    }

    const order = {
      usuarioId: null,
      status: "pendente",
      finalPrice: total,
      deliveryType,
      deliveryAddress:
        deliveryType === "entrega"
          ? `${cepData.logradouro}, ${cepData.numero} - ${cepData.bairro}, ${cepData.localidade} - ${cepData.uf}`
          : null,
      pedidoLocal: `${nomeCliente} ${numMesa !== "" ? `- Mesa ${numMesa}` : ""}`,
      paymentMethod: deliveryType === "local" ? "" : paymentMethod,
      changeFor: paymentMethod === "dinheiro" ? changeFor : null,
    };

    const orderItems = cart.map((item) => ({
      productId: item.products.id,
      quantity: item.quantity,
      size: item.products.category === "Pizza" ? item.size : null,
      borda: item.products.category === "Pizza" ? item.borda : null,
      observation: item.products.category === "Pizza" ? item.observation : null,
      priceUnity: item.priceUnity,
    }));

    createOrder(
      { order, orderItems },
      {
        onSuccess: () => {
          setCart([]);
          setNomeCliente("");
          setNumMesa(null);
          setChangeFor(null);
          setDeliveryType("retirada");
          setPaymentMethod("dinheiro");
          setCepData(null);
          setCepError(null);

          setIsItemsOpen(false);
          setOpenEndereco(false);
          setIsInformacoesClienteOpen(false);
        },
      },
    );
  }

  if (isPending || isSettings) {
    return <Loader />;
  }

  return (
    <TableArea>
      <h3 className="text-3xl font-bold">Criar Pedido</h3>

      <OrderItemList
        cart={cart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />

      {cart.length > 0 && (
        <OrderSummary
          cart={cart}
          deliveryType={deliveryType}
          settings={settings}
          total={total}
        />
      )}

      <ActionButtons
        isItemsOpen={isItemsOpen}
        setIsItemsOpen={setIsItemsOpen}
        isInformacoesClienteOpen={isInformacoesClienteOpen}
        setIsInformacoesClienteOpen={setIsInformacoesClienteOpen}
        openEndereco={openEndereco}
        setOpenEndereco={setOpenEndereco}
        cart={cart}
        handleCreateOrder={handleCreateOrder}
        isCreating={isCreating}
      />

      {isItemsOpen && (
        <AddItem items={cart} setItems={setCart} products={products} />
      )}

      {openEndereco && (
        <DeliveryMethodForm
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          cepData={cepData}
          setCepData={setCepData}
          cepError={cepError}
          setCepError={setCepError}
        />
      )}

      {isInformacoesClienteOpen && (
        <ClienteInfoForm
          nomeCliente={nomeCliente}
          setNomeCliente={setNomeCliente}
          numMesa={numMesa}
          setNumMesa={setNumMesa}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          changeFor={changeFor}
          setChangeFor={setChangeFor}
          deliveryType={deliveryType}
        />
      )}
    </TableArea>
  );
}

export default CriarPedido;
