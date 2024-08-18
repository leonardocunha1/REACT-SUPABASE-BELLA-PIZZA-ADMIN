import Button from "@/ui/Button";
import { useState } from "react";
import useSettings from "../settings/useSettings";

function AddItem({ products, items, setItems }) {
  const { settings, isPending } = useSettings();

  const [category, setCategory] = useState("Pizza");
  const [productId, setProductId] = useState("");
  const [size, setSize] = useState("Clássica");
  const [borda, setBorda] = useState(false);
  const [observacoes, setObservacoes] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event);
    setProductId("");
    setSize("Clássica");
    setBorda(false);
    setObservacoes("");
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    if (!productId) return;

    const checkingBorda = borda === "true" ? true : false;

    const pizzaValue =
      size === "Broto"
        ? products.find((product) => product.id === productId).price / 2
        : products.find((product) => product.id === productId).price;

    const bordaValue =
      size === "Broto" ? settings.bordaPrice / 2 : settings.bordaPrice;

    const itemDetails = {
      products: products.find((product) => product.id === productId),
      uniqueId: `${productId}-${size}-${borda}-${observacoes}`,
      quantity: 1,
      size: category === "Pizza" ? size : null,
      borda: category === "Pizza" ? checkingBorda : null,
      observation: category === "Pizza" ? observacoes : null,
      priceUnity:
        category === "Pizza" && checkingBorda
          ? pizzaValue + bordaValue
          : pizzaValue,
    };

    const checkExistItemInOrders = items.find(
      (item) =>
        item.products.id === productId &&
        item.size === itemDetails.size &&
        item.borda === itemDetails.borda &&
        item.observation === itemDetails.observation,
    );

    if (checkExistItemInOrders) {
      const updatedItems = items.map((item) => {
        if (
          item.products.id === productId &&
          item.size === itemDetails.size &&
          item.borda === itemDetails.borda &&
          item.observation === itemDetails.observation
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      setItems(updatedItems);
    } else {
      setItems([...items, itemDetails]);
    }

    setCategory("Pizza");
    setProductId("");
    setSize("Clássica");
    setBorda(false);
    setObservacoes("");
  };

  return (
    <form className="max-w-md">
      <div className="my-3 flex flex-col gap-2">
        <div className="flex max-w-md flex-col">
          <label className="font-semibold" htmlFor="category">
            Categoria
          </label>
          <select
            name="category"
            id="category"
            className="rounded-lg border border-gray-300 bg-stone-50 px-2 py-1 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={category}
            onChange={(e) => handleChangeCategory(e.target.value)}
          >
            <option value="Pizza">Pizza</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Bebida">Bebida</option>
          </select>
        </div>

        <div className="flex max-w-md flex-col">
          <label className="font-semibold" htmlFor="productId">
            Produto
          </label>
          <select
            name="productId"
            id="productId"
            className="rounded-lg border border-gray-300 bg-stone-50 px-2 py-1 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {products
              .filter(
                (product) =>
                  product.category === category && product.availability,
              )
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>
        </div>

        {category === "Pizza" && (
          <>
            <div className="flex max-w-md flex-col">
              <label className="font-semibold" htmlFor="size">
                Tamanho
              </label>
              <select
                name="size"
                id="size"
                className="rounded-lg border border-gray-300 bg-stone-50 px-2 py-1 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="Clássica">Clássica</option>
                <option value="Broto">Broto</option>
              </select>
            </div>
            <div className="flex max-w-md flex-col">
              <label className="font-semibold" htmlFor="borda">
                Borda
              </label>
              <select
                name="borda"
                id="borda"
                className="rounded-lg border border-gray-300 bg-stone-50 px-2 py-1 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={borda}
                onChange={(e) => setBorda(e.target.value)}
              >
                <option value={false}>Sem Borda</option>
                <option value={true}>Com Borda</option>
              </select>
            </div>
            <div className="flex max-w-md flex-col">
              <label className="font-semibold" htmlFor="observacoes">
                Observações
              </label>
              <input
                type="text"
                placeholder="Observações..."
                className="h-10 w-36 max-w-md rounded-lg border bg-stone-50 p-2 placeholder-stone-400 transition-all duration-300 focus:h-20 focus:w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <Button
        variation="secondary"
        onClick={handleAddItem}
        extraClasses="w-full"
      >
        +
      </Button>
    </form>
  );
}

export default AddItem;
