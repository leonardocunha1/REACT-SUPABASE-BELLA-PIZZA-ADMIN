import supabase from "./supabase";

export async function fetchCepData(cep, numero) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      return { error: "CEP não encontrado" };
    }
    return { data: { ...data, numero } };
  } catch (error) {
    // console.error(error);
    return { error: "Erro ao buscar CEP" };
  }
}

export async function createOrder(order, orderItems) {
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const orderId = data.id;

  const orderItemsWithOrderId = orderItems.map((item) => ({
    ...item,
    orderId,
  }));

  const { error: errorItems } = await supabase
    .from("order_items")
    .insert(orderItemsWithOrderId);

  if (errorItems) {
    throw new Error(errorItems.message);
  }
}
