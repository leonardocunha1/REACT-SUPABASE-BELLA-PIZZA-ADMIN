import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    // console.error(error);
    throw new Error("Os dados não puderam ser carregados.");
  }

  return data;
}

export async function updateSettings(novaConfiguracao) {
  const { data, error } = await supabase
    .from("settings")
    .update(novaConfiguracao)
    .eq("id", "c9a66280-314f-4074-b807-d5262a167cb0")
    .single();

  if (error) {
    //   console.error(error);
    throw new Error("Não foi possível atualizar as configurações.");
  }

  return data;
}
