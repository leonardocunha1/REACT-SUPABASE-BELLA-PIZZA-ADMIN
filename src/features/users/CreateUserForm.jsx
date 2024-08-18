import { useForm } from "react-hook-form";
import FormField from "../products/form/FormField";
import SubmitButton from "@/ui/SubmitButton";
import { useSignup } from "./useSignup";
import { useUser } from "./useUser";

function CreateUserForm({ onCloseModal }) {
  const { signup, isPending } = useSignup();
  const { user, isPending: isUser } = useUser();
  console.log(user);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, password, userType }) => {
    signup(
      { fullName: name, email, password, userType },
      {
        onSettled: () => {
          reset();
        },
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome" id="name" errors={errors}>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Campo obrigatório" })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-72"
          // disabled={isCreating}
        />
      </FormField>

      <FormField label="E-mail" id="email" errors={errors}>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Campo obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail inválido",
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-72"
          // disabled={isCreating}
        />
      </FormField>

      <FormField label="Senha" id="password" errors={errors}>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 6,
              message: "A senha deve ter no mínimo 6 caracteres",
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-72"
          // disabled={isCreating}
        />
      </FormField>

      <FormField
        label="Confirmar Senha"
        id="passwordConfirmation"
        errors={errors}
      >
        <input
          type="password"
          id="passwordConfirmation"
          {...register("passwordConfirmation", {
            required: "Campo obrigatório",
            validate: (value) =>
              value === getValues("password") || "As senhas não coincidem",
          })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-72"
          // disabled={isCreating}
        />
      </FormField>

      <FormField label="Tipo de Usuário" id="userType" errors={errors}>
        <select
          id="userType"
          {...register("userType", { required: true })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-stone-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-72"
        >
          <option value="admin">Admin</option>
          <option value="user">Usuário</option>
        </select>
      </FormField>

      <SubmitButton isCreating={isPending}>
        {isPending ? "Cadastrando..." : "Cadastrar"}
      </SubmitButton>
    </form>
  );
}

export default CreateUserForm;
