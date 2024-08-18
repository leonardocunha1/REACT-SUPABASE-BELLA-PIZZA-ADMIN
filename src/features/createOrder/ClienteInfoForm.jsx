function ClienteInfoForm({
  nomeCliente,
  setNomeCliente,
  numMesa,
  setNumMesa,
  paymentMethod,
  setPaymentMethod,
  changeFor,
  setChangeFor,
  deliveryType,
}) {
  return (
    <div className="mt-3 max-w-md">
      <input
        type="text"
        id="nomeCliente"
        name="nomeCliente"
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        className="w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
      />
      {deliveryType === "local" && (
        <input
          type="number"
          id="numMesa"
          name="numMesa"
          placeholder="Número da mesa"
          value={numMesa}
          onChange={(e) => setNumMesa(e.target.value)}
          className="mt-2 w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
        />
      )}
      {deliveryType !== "local" && (
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-2 w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="pix">Pix</option>
        </select>
      )}
      {paymentMethod === "dinheiro" && (
        <input
          type="number"
          id="changeFor"
          name="changeFor"
          placeholder="Troco para"
          value={changeFor}
          onChange={(e) => setChangeFor(e.target.value)}
          className="mt-2 w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
        />
      )}
    </div>
  );
}

export default ClienteInfoForm;
