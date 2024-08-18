import { useForm } from "react-hook-form";
import image from "../../public/icon.png";
import Button from "@/ui/Button";
import { useLogin } from "@/features/users/useLogin";
import Loader from "@/ui/Loader";

function Login() {
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    login({ email, password });
  };

  if (isPending) return <Loader />;

  return (
    <div className="flex h-screen items-center justify-center bg-stone-100 px-2">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-10 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <h1 className="text-center text-4xl font-bold text-stone-700">
            Login <span className="text-orange-500">Bella Pizza</span>
          </h1>
          <img
            src={image ? image : ""}
            alt="Logo"
            className="-order-1 h-20 w-20 sm:order-1 sm:h-10 sm:w-10"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email"
              id="email"
              {...register("email", { required: "Email é obrigatório" })}
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-orange-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              id="password"
              {...register("password", { required: "Senha é obrigatória" })}
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-orange-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            extraClasses="w-full font-bold text-stone-800"
            variation="secondary"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
