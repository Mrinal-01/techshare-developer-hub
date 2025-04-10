
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Plus, 
  Search,
  User,
  Settings,
  Crown,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostDialog } from '@/components/posts/CreatePostDialog';

const Header = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      duration: 3000,
    });
  };

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container h-16 flex items-center justify-between px-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search articles, tags, or authors..." 
            className="pl-8 w-full bg-muted/40"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreatePost(true)} className="bg-techshare-purple hover:bg-techshare-darkPurple">
            <Plus className="mr-1 h-4 w-4" />
            Create Post
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-techshare-accent">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Link to="/notifications" className="text-xs text-techshare-purple hover:underline">
                  View All
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <div className="p-3 border-b">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Sarah Chen</span> commented on your post</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Michael Rodriguez</span> liked your post</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Jessica Kim</span> shared your post</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">alex.johnson@company.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/upgrade" className="cursor-pointer">
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Upgrade to Plus</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <CreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />
    </header>
  );
};

export default Header;
