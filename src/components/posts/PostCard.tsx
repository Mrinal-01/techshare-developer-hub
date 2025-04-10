
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    publishedAt: string;
    tags: string[];
    likes: number;
    comments: number;
    image?: string;
  };
  isListView?: boolean;
}

const PostCard = ({ post, isListView = false }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied to clipboard",
      description: "Now you can share this post with others",
      duration: 3000,
    });
  };

  return (
    <Card className={cn(
      "post-card overflow-hidden",
      isListView ? "flex flex-row gap-4" : ""
    )}>
      {isListView && post.image && (
        <div className="w-24 h-24 sm:w-40 sm:h-auto flex-shrink-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-1">
        <CardHeader className="flex flex-row gap-3 items-start p-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role} • {post.publishedAt}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Not interested</DropdownMenuItem>
                  <DropdownMenuItem>Follow author</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <Link to={`/post/${post.id}`} className="group">
            <h3 className="text-xl font-semibold group-hover:text-techshare-purple transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
          
          {!isListView && post.image && (
            <div className="mt-4 -mx-4">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link to={`/tag/${tag}`} key={tag} className="tag-badge">
                #{tag}
              </Link>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-muted-foreground"
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-red-500 text-red-500")} />
              <span>{likesCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-muted-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleBookmark}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
