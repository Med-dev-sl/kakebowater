import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function User() {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    router.push("/login");
  };

  if (!auth.isAuthenticated) return null;

  return (
    <div className="flex h-16 items-center border-b border-border px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 outline-none">
            <div className="flex items-center">
              <div className="mr-2 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {auth.user?.name?.[0] || "U"}
              </div>
              <div className="flex flex-col items-start translate-y-[-1px]">
                <span className="text-sm font-medium line-clamp-1">{auth.user?.name || "User"}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Admin</span>
              </div>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[160px]">
          <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
