import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { AuthContext } from '@/providers/AuthProvider';
import { ChevronsUpDown } from 'lucide-react';
import { useContext } from 'react';
import UserInfo from '../userinfo/UserInfo';

export function SidebarUserInfo() {
  const { user } = useContext(AuthContext);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserInfo>
          <SidebarMenuButton
            size="lg"
            className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{user?.login?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.login}</span>
              {/* <span className="truncate text-xs">{user?.email}</span> */}
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </UserInfo>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
