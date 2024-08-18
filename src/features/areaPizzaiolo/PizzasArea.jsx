import Loader from "@/ui/Loader";
import useGetConfirmedOrders from "./useGetConfirmedOrders";
import Modal from "@/ui/Modal";
import PedidoPronto from "./PedidoPronto";

function PizzasArea() {
  const { isPending, confirmedOrders = [] } = useGetConfirmedOrders();

  if (isPending) return <Loader />;

  if (confirmedOrders.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
        <h1 className="text-lg text-stone-700">
          Nenhum pedido a ser feito no momento
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {confirmedOrders.map((order) => {
        const hasPizza = order.order_items.some(
          (item) => item.products.category === "Pizza",
        );

        if (hasPizza) {
          return (
            <div
              key={order.id}
              className="mb-4 flex min-h-72 max-w-72 flex-col rounded-lg border border-stone-400 bg-white p-4 shadow-md"
            >
              <h2 className="mb-2 text-center text-base font-bold text-stone-700">
                Pedido <span className="text-orange-500">#{order.id}</span>
              </h2>
              <h3 className="mb-4 text-center text-base text-stone-800">
                {order?.usuarios?.fullName ?? order.pedidoLocal}
              </h3>
              <ul className="mb-4 flex flex-col gap-3">
                {order.order_items
                  .filter((item) => item.products.category === "Pizza")
                  .map((pizza) => {
                    const pizzaName = pizza.products.name.split("Pizza de ")[1];

                    return (
                      <li
                        key={pizza.id}
                        className="ml-4 border-b pb-2 text-stone-700 last:border-b-0"
                      >
                        <p className="font-semibold">
                          {pizzaName} -{" "}
                          {pizza.size === "Clássica" ? "clássica" : "broto"}{" "}
                          {pizza.borda ? "- borda recheada" : ""}
                        </p>
                        {pizza.observation && (
                          <p className="mt-1 italic text-stone-500">
                            Observação: {pizza.observation}
                          </p>
                        )}
                      </li>
                    );
                  })}
              </ul>
              <Modal>
                <Modal.Open opens="confirmarPedido">
                  <button className="mt-auto w-full rounded-xl bg-green-600 py-2 font-semibold tracking-wide text-stone-50 opacity-80 duration-200 hover:bg-green-500">
                    Pedido Pronto
                  </button>
                </Modal.Open>

                <Modal.Window name="confirmarPedido" maxWidth="max-w-lg">
                  <PedidoPronto
                    userName={order?.usuarios?.fullName ?? order.pedidoLocal}
                    orderId={order.id}
                  />
                </Modal.Window>
              </Modal>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default PizzasArea;
