function StatusOrders({ status }) {
  const base = "text-[11px] rounded-full text-center font-bold uppercase px-3";

  let classes = "";
  let statusText = "";

  if (status === "pendente") {
    classes = `bg-blue-200 text-blue-600`;
    statusText = "Pendente";
  }

  if (status === "confirmado") {
    classes = `bg-green-200 text-green-600`;
    statusText = "preparando";
  }

  if (status === "pronto") {
    classes = `bg-yellow-200 text-yellow-600`;
    statusText = "Pronto";
  }

  //   if (status === "servido") {
  //     classes = `bg-orange-200 text-stone-600`;
  //     statusText = "Servido";
  //   }

  if (status === "pago") {
    classes = `bg-stone-200 text-stone-600`;
    statusText = "Pago";
  }

  if (status === "cancelado") {
    classes = `bg-red-200 text-red-600`;
    statusText = "Cancelado";
  }

  return <p className={`${base} ${classes}`}>{statusText}</p>;
}

export default StatusOrders;
