import { useAuth } from "../hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export function Avatar() {
  const { user, signOut } = useAuth();
  const userInitial = user?.name[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-16 h-16 rounded-full bg-violet-100 pl-0.5 text-2xl border border-violet-200 text-violet-700 hover:scale-105 hover:shadow-lg transition-transform"
        >
          {userInitial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button type="button" onClick={signOut}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
