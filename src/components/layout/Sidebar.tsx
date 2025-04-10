
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Compass, 
  Clock, 
  Users, 
  Bookmark, 
  Settings, 
  Moon, 
  Sun, 
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed: boolean;
}

const NavItem = ({ icon, label, to, active = false, collapsed }: NavItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className={cn(
          "sidebar-link",
          active && "active"
        )}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: `${darkMode ? 'Light' : 'Dark'} mode activated`,
      duration: 2000,
    });
  };

  return (
    <aside className={cn(
      "min-h-screen border-r bg-background flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-techshare-purple flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-semibold text-lg">TechShare</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-md bg-techshare-purple flex items-center justify-center text-white font-bold">
            T
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-grow p-2">
        <ul className="space-y-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="My Feed" 
            to="/" 
            active={true} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={<Compass size={18} />} 
            label="Explore" 
            to="/explore" 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={<Clock size={18} />} 
            label="History" 
            to="/history" 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Squads" 
            to="/squads" 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={<Bookmark size={18} />} 
            label="Bookmarks" 
            to="/bookmarks" 
            collapsed={collapsed} 
          />
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-techshare-accent flex items-center justify-center text-white text-xs font-bold">
              Lv2
            </div>
            <div className="text-sm">
              <div className="font-medium">230 Rep</div>
              <Link to="/profile" className="text-xs text-techshare-purple hover:underline">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="p-2 border-t">
        <ul className="space-y-1">
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            to="/settings" 
            collapsed={collapsed} 
          />
          <li>
            <Button 
              variant="ghost" 
              className={cn(
                "sidebar-link w-full justify-start",
              )}
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
