import { subDays, endOfDay, startOfDay } from "date-fns";
import supabase from "./supabase";
import { PAGE_SIZE } from "@/utils/constants";

export async function getOrders({ status, date, page }) {
  let query = supabase
    .from("orders")
    .select(
      `
      *,
      usuarios:usuarioId (
        fullName
      ),
      order_items (
        id, 
        quantity,
        size,
        borda,
        observation, 
        priceUnity, 
        products (
          name,
          category
        )
      )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (date) {
    if (date.value === 0) {
      const startDate = startOfDay(new Date()).toISOString();
      const endDate = endOfDay(new Date()).toISOString();

      query = query.gte("created_at", startDate).lte("created_at", endDate);
    } else {
      const startDate = subDays(new Date(), date.value).toISOString();
      const endDate = endOfDay(new Date()).toISOString();

      query = query.gte("created_at", startDate).lte("created_at", endDate);
    }
  }

  if (status) {
    query = query.eq(status.field, status.value);
    // console.log("testando");
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  //   console.log(count);

  if (error) {
    // console.error(error);
    throw new Error(error.message);
  }

  //   console.log(data);
  return { data, count };
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id, 
        quantity,
        size,
        borda,
        observation, 
        priceUnity, 
        products (
          id,
          name,
          category,
          price
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    // console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function atualizarOrderItems(order, items, troco, valEntrega) {
  //   console.log(order.order_items);
  //   console.log(items);
  // Checa se há itens
  if (items.length === 0) {
    throw new Error(
      "Nenhum item no pedido. Se precisar cancelar o pedido, volte na aba 'Pedidos' e cancele o pedido por lá",
    );
  }

  // Calcula o preço final
  const finalPrice =
    items.reduce((acc, item) => acc + item.priceUnity * item.quantity, 0) +
    (order.deliveryType === "entrega" ? valEntrega : 0);

  // Atualiza o pedido na tabela `orders`
  const { data, error } = await supabase
    .from("orders")
    .update({
      finalPrice: finalPrice,
      changeFor: troco,
    })
    .eq("id", order.id);

  if (error) {
    throw new Error(error.message);
  }

  // Deletando itens que foram removidos
  const itensToDelete = order.order_items
    // o !items.find((i) => i.id === item.id) é para verificar se o item não existe no array de items, ou seja, se ele foi deletado
    .filter((item) => !items.find((i) => i.id === item.id))
    .map((item) => item.id);

  const { data: dataItemsDelete, error: errorItemsDelete } = await supabase
    .from("order_items")
    .delete()
    .in("id", itensToDelete);

  if (errorItemsDelete) {
    throw new Error(errorItemsDelete.message);
  }

  // Filtra e mapeia itens para atualização e inserção
  const itensToUpdate = items
    .filter((item) => item.id)
    .map((item) => ({
      id: item.id,
      quantity: item.quantity,
      size: item.size,
      borda: item.borda,
      observation: item.observation,
      priceUnity: item.priceUnity,
    }));

  const itemsToInsert = items
    .filter((item) => !item.id)
    .map((item) => ({
      orderId: order.id,
      productId: item.products.id,
      quantity: item.quantity,
      size: item.size,
      borda: item.borda,
      observation: item.observation,
      priceUnity: item.priceUnity,
    }));

  // Atualiza itens existentes na tabela `order_items`
  if (itensToUpdate.length > 0) {
    const { data: dataItemsUpdate, error: errorItemsUpdate } = await supabase
      .from("order_items")
      .upsert(itensToUpdate, { onConflict: ["id"] });

    if (errorItemsUpdate) {
      throw new Error(errorItemsUpdate.message);
    }
  }

  // Insere novos itens na tabela `order_items`
  if (itemsToInsert.length > 0) {
    const { data: dataItemsInsert, error: errorItemsInsert } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (errorItemsInsert) {
      throw new Error(errorItemsInsert.message);
    }
  }
}

export async function changeStatusOrder(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteOrder(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getOrdersStatusConfirmado() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        *,
        usuarios:usuarioId (
        fullName
        ),
        order_items (
          id, 
          quantity,
          size,
          borda,
          observation, 
          priceUnity, 
          products (
            id,
            name,
            category,
            price
          )
        )
      `,
    )
    .eq("status", "confirmado");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateStatusOrderItems(orderItems, status) {
  //   let update;
  //   if (status === null) {
  //   }
  //   const { data, error } = await supabase
  //     .from("orders")
  //     .update({ status })
  //     .eq("id", orderId);
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data;
}
