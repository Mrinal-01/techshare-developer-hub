
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="h-24 w-24 mx-auto bg-techshare-purple/10 rounded-full flex items-center justify-center text-techshare-purple mb-6">
            <span className="text-6xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/explore">
              Explore Content
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
