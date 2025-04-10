
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ListFilter, LayoutGrid, List } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface FeedFiltersProps {
  onViewChange: (view: 'card' | 'list') => void;
  currentView: 'card' | 'list';
}

const FeedFilters = ({ onViewChange, currentView }: FeedFiltersProps) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState('today');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const { toast } = useToast();

  const tags = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'webdev', label: 'WebDev' },
    { id: 'devops', label: 'DevOps' },
  ];

  const timeOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const handleTagChange = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(tag => tag !== tagId) 
        : [...prev, tagId]
    );
  };

  const handleApplyFilters = () => {
    setFiltersApplied(selectedTags.length > 0);
    toast({
      title: "Filters applied",
      description: `Applied ${selectedTags.length} filters with time range: ${timeFilter}`,
      duration: 3000,
    });
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setTimeFilter('today');
    setFiltersApplied(false);
    toast({
      title: "Filters cleared",
      duration: 2000,
    });
  };

  return (
    <div className="border-b pb-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0">
          <Button 
            variant={activeTab === 'recommended' ? 'default' : 'ghost'} 
            className="whitespace-nowrap"
            onClick={() => setActiveTab('recommended')}
          >
            Recommended
          </Button>
          <Button 
            variant={activeTab === 'latest' ? 'default' : 'ghost'} 
            className="whitespace-nowrap"
            onClick={() => setActiveTab('latest')}
          >
            Latest
          </Button>
          <Button 
            variant={activeTab === 'popular' ? 'default' : 'ghost'} 
            className="whitespace-nowrap"
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap gap-1">
                <ListFilter className="h-4 w-4" />
                <span>Filter</span>
                {filtersApplied && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter By</h4>
                
                <div>
                  <h5 className="mb-2 text-sm font-medium">Tags</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {tags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag.id}`} 
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => handleTagChange(tag.id)}
                        />
                        <Label htmlFor={`tag-${tag.id}`}>{tag.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="mb-2 text-sm font-medium">Time</h5>
                  <RadioGroup 
                    value={timeFilter} 
                    onValueChange={setTimeFilter}
                    className="flex flex-col space-y-1"
                  >
                    {timeOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`time-${option.id}`} />
                        <Label htmlFor={`time-${option.id}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-9 rounded-r-none ${currentView === 'card' ? 'bg-muted' : ''}`} 
              onClick={() => onViewChange('card')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" />
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-9 rounded-l-none ${currentView === 'list' ? 'bg-muted' : ''}`} 
              onClick={() => onViewChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;
