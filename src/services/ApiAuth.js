import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, userType }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        userType,
        avatar: "",
        status: "ativo",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // return data;
}

export async function login({ email, password }) {
  //   console.log("email", email);
  //   console.log("password", password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  //   console.log(data);
  return data;
}

export async function getCurrentUser() {
  // o getSession é um método do supabase.auth que retorna a sessão do usuário autenticado. Se não houver um usuário autenticado, ele retorna null. Este método recupera a sessão local atual (ou seja,  local storage).
  // Para ver o local storage, você pode abrir o console do navegador e ir para a aba Application. Lá, você verá um item chamado Local Storage. Dentro dele, você verá um item chamado auth.token. Este é o token de autenticação que o Supabase usa para autenticar o usuário. É um objeto JSON que contém o token de autenticação e a data de expiração do token. Se o token expirar, o Supabase solicitará ao usuário que faça login novamente.
  const { data: session } = await supabase.auth.getSession();
  //   console.log(session);
  //   console.log(session.session);

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  //   console.log(data);
  //   console.log(data.user);

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
