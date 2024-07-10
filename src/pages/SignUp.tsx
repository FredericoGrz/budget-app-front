import { Input } from "../components/Input";
import jacare from "../assets/jacare-regando-planta.png";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../components/ui/use-toast";
import { CustomError } from "../types/errorTypes";
import budgetLogo from "../assets/budget-app-logo.png";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(3, "A senha deve ter no mínimo 3 caracteres"),
});

function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (newUser: IFormInputs) => {
    try {
      await api.post("users", newUser);
      toast({
        title: "Success",
        description: "User created with success",
        variant: "success",
      });
      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.log(error);
      const typedError = error as CustomError;
      const errorMessage = typedError.response?.data?.message;

      toast({
        title: "Error",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-12">
      <div className="bg-violet-100 hidden lg:flex lg:col-span-8 justify-center items-center">
        <div className="-mt-32 flex flex-col gap-4 items-center">
          <img src={jacare} alt="" />
          <p className="text-xl xl:text-2xl">
            Your <b>journey</b> to an organized financial life starts here.{" "}
            <b>No cost</b>.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 lg:col-span-4 lg:z-10 lg:shadow-left flex flex-col justify-evenly items-center p-4">
        <div className="flex flex-col items-center justify-between h-1/4">
          <img src={budgetLogo} alt="App Logo" className="h-32 w-32" />
          <h1 className="text-xl xs:text-2xl font-medium text-violet-700 text-center">
            Create Your Account
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full p-4"
        >
          <Input
            label="Name"
            type="text"
            {...register("name")}
            error={errors.name ? errors.name.message : ""}
            variant="dark"
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email ? errors.email.message : ""}
            variant="dark"
          />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password ? errors.password.message : ""}
            variant="dark"
          />
          <button
            type="submit"
            className="text-zinc-50 bg-zinc-800 p-4 text-center rounded-3xl"
          >
            Create Account
          </button>
        </form>
        <div className="flex flex-col gap-5 px-4 w-full">
          <Link
            to="/"
            className="text-zinc-800 bg-zinc-50 p-4 text-center border-zinc-800 border shadow-lg rounded-3xl"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
