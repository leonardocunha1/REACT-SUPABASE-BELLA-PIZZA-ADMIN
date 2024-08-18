import { FaCartPlus } from "react-icons/fa6";
import Button from "@/ui/Button";

function ActionButtons({
  isItemsOpen,
  setIsItemsOpen,
  isInformacoesClienteOpen,
  setIsInformacoesClienteOpen,
  openEndereco,
  setOpenEndereco,
  cart,
  handleCreateOrder,
  isCreating,
}) {
  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-normal">
        <Button
          onClick={() => {
            setIsItemsOpen(!isItemsOpen);
            setIsInformacoesClienteOpen(false);
            setOpenEndereco(false);
          }}
          extraClasses="flex gap-2 w-full md:w-auto items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCartPlus /> Adicionar item
        </Button>
        <Button
          onClick={() => {
            setIsItemsOpen(false);
            setIsInformacoesClienteOpen(false);
            setOpenEndereco(!openEndereco);
          }}
          extraClasses="w-full md:w-auto"
        >
          Método de Entrega
        </Button>
        <Button
          onClick={() => {
            setIsItemsOpen(false);
            setOpenEndereco(false);
            setIsInformacoesClienteOpen(!isInformacoesClienteOpen);
          }}
          extraClasses="w-full md:w-auto"
        >
          Informações do Cliente
        </Button>
      </div>
      {cart.length > 0 && (
        <Button
          variation="danger"
          extraClasses="disabled:bg-opacity-50'"
          onClick={(e) => handleCreateOrder(e)}
        >
          {isCreating ? "Finalizando Pedido" : "Finalizar Pedido"}
        </Button>
      )}
    </div>
  );
}

export default ActionButtons;
