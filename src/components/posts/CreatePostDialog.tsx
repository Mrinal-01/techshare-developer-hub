
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Bold, Italic, Link2, Code, Image } from 'lucide-react';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Post published successfully!",
      description: "Your post has been published to the feed.",
      duration: 3000,
    });
    
    // Reset form and close dialog
    setTitle('');
    setContent('');
    setTags('');
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your post has been saved as a draft.",
      duration: 3000,
    });
    onOpenChange(false);
  };

  const insertFormatting = (type: string) => {
    const textarea = document.getElementById('postContent') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch(type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'image':
        formattedText = `![alt text](image-url)`;
        break;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Set focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share your knowledge with the community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="postTitle">Title</Label>
            <Input 
              id="postTitle" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title" 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postContent">Content</Label>
            <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded-md bg-muted/40">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('link')}
              >
                <Link2 className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('code')}
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('image')}
              >
                <Image className="h-4 w-4" />
              </Button>
            </div>
            <Textarea 
              id="postContent" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..." 
              rows={10} 
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postTags">Tags</Label>
            <Input 
              id="postTags" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags separated by commas (e.g., javascript, webdev)" 
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button type="submit" className="bg-techshare-purple hover:bg-techshare-darkPurple">
              Publish Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
