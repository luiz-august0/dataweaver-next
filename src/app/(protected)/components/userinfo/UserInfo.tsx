import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { useLogout } from '@/hooks/use-logout';
import { AuthContext } from '@/providers/AuthProvider';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useContext } from 'react';

export default function UserInfo({ children }: { children: JSX.Element }) {
  const { isMobile, state } = useSidebar();
  const { setOpenUserModal, user } = useContext(AuthContext);
  const isCollapsed = state === 'collapsed';
  const { logout } = useLogout();
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        {isCollapsed && (
          <>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user?.login} />
                  <AvatarFallback className="rounded-lg">{user?.login?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.login}</span>
                  {/* <span className="truncate text-xs">{user?.email}</span> */}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setOpenUserModal?.(true)}>
          <User />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={logout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DropdownMenuItem className="hover:cursor-pointer">
              <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              Mudar tema
            </DropdownMenuItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg z-50"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Escuro</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>Padrão</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
