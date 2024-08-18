function useOrderedItems(items) {
  const pizzas = items.filter((product) => product.category === "Pizza");
  const sobremesas = items.filter(
    (product) => product.category === "Sobremesa",
  );
  const bebidas = items.filter((product) => product.category === "Bebida");

  return [...pizzas, ...sobremesas, ...bebidas];
}

export default useOrderedItems;
