import { Input } from "../components/Input";
import jacare from "../assets/jacare-regando-planta.png";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../hooks/use-auth";
import budgetLogo from "../assets/budget-app-logo.png";
import { Button } from "../components/Button";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (user: IFormInputs) => {
    setIsLoading(true);
    await signIn(user);
    setIsLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-12">
      <div className="bg-zinc-50 lg:col-span-4 lg:z-10 lg:shadow-right flex flex-col justify-evenly items-center p-4">
        <div className="flex flex-col items-center justify-between h-1/4">
          <img src={budgetLogo} alt="App Logo" className="h-32 w-32" />
          <h1 className="text-xl xs:text-2xl font-medium text-violet-700 text-center">
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
            variant="dark"
            required
            {...register("email")}
            error={errors.email ? errors.email.message : ""}
          />
          <Input
            label="Password"
            type="password"
            variant="dark"
            required
            {...register("password")}
            error={errors.password ? errors.password.message : ""}
          />
          <div className="flex flex-col gap-5 w-full">
            <Button
              title="Login"
              variant="dark"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />

            <Link
              to="/signup"
              className="text-zinc-800 bg-zinc-50 p-4 text-center border-zinc-800 border shadow-lg rounded-3xl"
            >
              Sign Up
            </Link>
          </div>
        </form>
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
