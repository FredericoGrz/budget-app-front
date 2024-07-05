import { useAuth } from "../hooks/use-auth";
import { Avatar } from "./Avatar";
import { StatusBudgetHeader } from "./StatusBudgetHeader";

export function Header() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between xl:px-8 p-4">
      <div className="flex flex-col gap-4">
        <p className="text-3xl text-violet-700">Budget App</p>
        {user?.name && <p className="text-violet-500">Welcome {user.name}!</p>}
      </div>
      <StatusBudgetHeader className="hidden lg:flex items-center gap-10" />
      <Avatar />
    </div>
  );
}
