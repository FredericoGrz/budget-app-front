import { useAuth } from "../hooks/use-auth";
import { Avatar } from "./Avatar";

export function Header() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-4">
        <p className="text-3xl">Budget App</p>
        {user?.name && <p className="text-zinc-700">Welcome {user.name}!</p>}
      </div>
      <Avatar />
    </div>
  );
}
