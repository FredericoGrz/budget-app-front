import { useAuth } from "../hooks/use-auth";
import { Avatar } from "./Avatar";
import { StatusBudgetHeader } from "./StatusBudgetHeader";
import { Skeleton } from "./ui/skeleton";
import budgetapp from "../assets/budget-app-logo.png";

type HeaderProps = {
  budgetAvailable: number;
  spent: number;
  isLoading: boolean;
};

export function Header({
  budgetAvailable,
  spent,
  isLoading = false,
}: HeaderProps) {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between xl:px-8 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-center">
          <img src={budgetapp} alt="Budget App Logo" className="h-16 w-16" />
          <p className="text-3xl text-violet-700">Budget App</p>
        </div>
        {user?.name && <p className="text-violet-500">Welcome {user.name}!</p>}
      </div>
      {isLoading ? (
        <div className="hidden lg:flex items-center gap-10">
          <Skeleton className="h-16 w-52" />
          <Skeleton className="h-16 w-52" />
        </div>
      ) : (
        <StatusBudgetHeader
          budgetAvailable={budgetAvailable}
          spent={spent}
          className="hidden lg:flex items-center gap-10"
        />
      )}
      <Avatar />
    </div>
  );
}
