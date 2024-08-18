import EnderecoForm from "@/features/createOrder/EnderecoForm";

function DeliveryMethodForm({
  deliveryType,
  setDeliveryType,
  cepData,
  setCepData,
  cepError,
  setCepError,
}) {
  return (
    <>
      <div className="mt-3 flex max-w-md flex-col gap-2">
        <label htmlFor="deliveryType">Método de Entrega</label>
        <select
          id="deliveryType"
          name="deliveryType"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          className="w-full rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-orange-500"
        >
          <option value="entrega">Entrega</option>
          <option value="retirada">Retirada</option>
          {/* <option value="local">Consumo no Local</option> */}
        </select>
      </div>
      {deliveryType === "entrega" && (
        <EnderecoForm
          cepData={cepData}
          cepError={cepError}
          setCepData={setCepData}
          setCepError={setCepError}
        />
      )}
    </>
  );
}

export default DeliveryMethodForm;
