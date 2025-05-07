import {
  Sidebar as CNSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { menus } from './menus';
import { SidebarMenus } from './SidebarMenus';
import { SidebarUserInfo } from './SidebarUserInfo';

export default function Sidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <CNSidebar className="z-40" collapsible="icon" variant="inset">
      <SidebarHeader className="mb-4">
        {/* {isCollapsed ? (
          <Image src={'/images/logo-icon.png'} alt="Header" width={34} height={34} />
        ) : (
          <Image src={'/images/logo-header.png'} alt="Header" width={176} height={38} />
        )} */}
        <div className="absolute top-4 -right-3">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-accent transition-all shadow cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="size-5" aria-hidden="true" />
            ) : (
              <ChevronLeft className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenus menus={menus} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserInfo />
      </SidebarFooter>
    </CNSidebar>
  );
}
