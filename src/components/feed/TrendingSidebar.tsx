
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TrendingSidebar = () => {
  const { toast } = useToast();

  const handleFollow = (authorName: string) => {
    toast({
      title: `You are now following ${authorName}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'javascript', 'react', 'webdev', 'python', 
              'ai', 'machinelearning', 'devops', 'cloud'
            ].map((tag) => (
              <Link 
                key={tag} 
                to={`/tag/${tag}`} 
                className="tag-badge"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Authors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { 
              name: 'Sarah Chen', 
              role: 'Frontend Developer', 
              avatar: '/placeholder.svg' 
            },
            { 
              name: 'Michael Rodriguez', 
              role: 'DevOps Engineer', 
              avatar: '/placeholder.svg' 
            },
            { 
              name: 'Jessica Kim', 
              role: 'Data Scientist', 
              avatar: '/placeholder.svg' 
            }
          ].map((author) => (
            <div key={author.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={author.avatar} />
                  <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{author.name}</p>
                  <p className="text-xs text-muted-foreground">{author.role}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleFollow(author.name)}
              >
                Follow
              </Button>
            </div>
          ))}
          <Link to="/authors" className="text-xs text-techshare-purple hover:underline block text-center mt-2">
            View All Authors
          </Link>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-techshare-purple to-techshare-darkPurple text-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">Upgrade to TechShare Plus</h3>
          <p className="text-sm mt-2 text-white/80">Get exclusive features, ad-free experience, and more!</p>
          <Button className="w-full mt-4 bg-white text-techshare-darkPurple hover:bg-white/90">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingSidebar;
