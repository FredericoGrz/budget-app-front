import { Input } from "../components/Input";
import { LuPiggyBank } from "react-icons/lu";
import jacare from "../assets/jacare-regando-planta.png";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../hooks/use-auth";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Formato inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

function Login() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (user: IFormInputs) => {
    signIn(user);
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-12">
      <div className="bg-zinc-50 lg:col-span-4 lg:z-10 lg:shadow-right flex flex-col justify-evenly items-center p-4">
        <div className="flex flex-col items-center justify-between h-1/4">
          <LuPiggyBank className="text-8xl xs:text-9xl text-zinc-700" />
          <h1 className="text-xl xs:text-2xl font-medium text-zinc-700 text-center">
            Welcome to Budget Web App
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full p-4"
        >
          <Input
            label="Email"
            type="email"
            required
            {...register("email")}
            error={errors.email ? errors.email.message : ""}
          />
          <Input
            label="Password"
            type="password"
            required
            {...register("password")}
            error={errors.password ? errors.password.message : ""}
          />
        </form>
        <div className="flex flex-col gap-5 px-4 w-full">
          <button
            onClick={handleSubmit(onSubmit)}
            className="text-zinc-50 bg-zinc-800 p-4 text-center rounded-3xl"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-zinc-800 bg-zinc-50 p-4 text-center border-zinc-800 border shadow-lg rounded-3xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="bg-violet-100 hidden lg:flex lg:col-span-8 justify-center items-center">
        <div className="-mt-32 flex flex-col gap-4 items-center">
          <img src={jacare} alt="" />
          <p className="text-xl xl:text-2xl">
            Your <b>journey</b> to an organized financial life starts here.{" "}
            <b>No cost</b>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
