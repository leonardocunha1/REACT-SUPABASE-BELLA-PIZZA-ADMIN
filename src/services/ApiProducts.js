import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error("Os dados dos produtos não puderam ser carregados.");
  }

  return data;
}

export async function deleteProduct(idProduto, urlImg) {
  const imageName = urlImg.split("/").pop();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", idProduto);

  if (error) {
    throw new Error("O produto não pôde ser deletado.");
  }

  const { error: errorImg } = await supabase.storage
    .from("pizzas")
    .remove([imageName]);

  if (errorImg) {
    throw new Error("A imagem do produto não pôde ser deletada.");
  }
}

export async function createEditProduct(newProduct, id) {
  if (
    newProduct.category !== "Pizza" &&
    newProduct.category !== "Bebida" &&
    newProduct.category !== "Sobremesa"
  ) {
    throw new Error("Categoria inválida");
  }

  // Função auxiliar para gerar o nome da imagem
  function generateImageName(imageFile) {
    let imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");

    // substitui espaços por hífen
    imageName = imageName.replaceAll(/\s+/g, "-");

    return imageName;
  }

  // LIDANDO COM A URL E O NOME DA IMAGEM

  // se não existir a URL da imagem, a variável será undefined. Isso ocorrerá quando o produto for criado ou quando a imagem de um produto for editada
  const verificandoUrlImg = newProduct.image_url?.startsWith?.(supabaseUrl);

  let nomeImagem = null;
  let urlImagem = null;

  if (verificandoUrlImg) {
    urlImagem = newProduct.image_url;
  } else if (newProduct.image_url) {
    // Caso contrário, gerar um novo nome de imagem
    nomeImagem = generateImageName(newProduct.image_url);
    urlImagem = `${supabaseUrl}/storage/v1/object/public/pizzas/${nomeImagem}`;
  } else {
    throw new Error("URL da imagem inválida.");
  }

  // LIDANDO COM A CRIAÇÃO/EDIÇÃO DO PRODUTO

  let query = supabase.from("products");

  if (!id) {
    query = query.insert({ ...newProduct, image_url: urlImagem });
  } else {
    query = query.update({ ...newProduct, image_url: urlImagem }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Não foi possível criar/editar o produto.");
  }

  // LIDANDO COM O UPLOAD DA IMAGEM NO STORAGE
  if (verificandoUrlImg) return data;

  const { error: errorImg } = await supabase.storage
    .from("pizzas")
    .upload(nomeImagem, newProduct.image_url);

  if (errorImg) {
    await supabase.from("products").delete().eq("id", data.id);
    throw new Error("Não foi possível fazer o upload da imagem.");
  }

  return data;
}
