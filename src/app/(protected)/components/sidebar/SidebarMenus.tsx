import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Menu = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export function SidebarMenus({ menus }: { menus: Menu[] }) {
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const renderMenu = (item: Menu) => (
    <SidebarMenuButton
      asChild
      className="group relative flex h-11 w-full items-center justify-start px-3 py-2 transition-colors hover:bg-brand/10"
    >
      <Link href={item.url} className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
        <item.icon className="size-5 flex-shrink-0" aria-hidden="true" />
        <span>{item.name}</span>
      </Link>
    </SidebarMenuButton>
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.url}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>{renderMenu(item)}</TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" align="center">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ) : (
              <>{renderMenu(item)}</>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
