import { useAuth } from "../hooks/use-auth";
import { Avatar } from "./Avatar";
import { StatusBudgetHeader } from "./StatusBudgetHeader";

type HeaderProps = {
  budgetAvailable: number;
  spent: number;
};

export function Header({ budgetAvailable, spent }: HeaderProps) {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between xl:px-8 p-4">
      <div className="flex flex-col gap-4">
        <p className="text-3xl text-violet-700">Budget App</p>
        {user?.name && <p className="text-violet-500">Welcome {user.name}!</p>}
      </div>
      <StatusBudgetHeader
        budgetAvailable={budgetAvailable}
        spent={spent}
        className="hidden lg:flex items-center gap-10"
      />
      <Avatar />
    </div>
  );
}
