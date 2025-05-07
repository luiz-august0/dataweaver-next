import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { AuthContext } from '@/providers/AuthProvider';
import { AlignJustify } from 'lucide-react';
import { useContext } from 'react';
import UserInfo from '../userinfo/UserInfo';

export default function Topbar() {
  const { toggleSidebar } = useSidebar();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex sticky z-10 top-0 w-full py-4 px-2 bg-background justify-between flex-row">
      <Button type="button" variant="ghost" onClick={toggleSidebar}>
        <AlignJustify className="mr-2 h-4 w-4" />
        Menu
      </Button>
      <UserInfo>
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">{user?.login?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </UserInfo>
    </div>
  );
}
