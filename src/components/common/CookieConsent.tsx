
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShowConsent(false);
    setShowCustomize(false);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowConsent(false);
    setShowCustomize(false);
  };

  if (!showConsent) return null;

  return (
    <>
      <div className={cn(
        "fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg z-50 animate-fade-in",
        showCustomize && "hidden"
      )}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center sm:text-left">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCustomize}>
              Customize
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. Some cookies are necessary for the website to function properly.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="necessary">Necessary Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function properly.
                </p>
              </div>
              <Switch 
                id="necessary" 
                checked={preferences.necessary} 
                disabled
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="functional">Functional Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Enable personalized features and settings.
                </p>
              </div>
              <Switch 
                id="functional" 
                checked={preferences.functional} 
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, functional: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Help us understand how you use our website.
                </p>
              </div>
              <Switch 
                id="analytics" 
                checked={preferences.analytics} 
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, analytics: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Used to deliver relevant ads and marketing campaigns.
                </p>
              </div>
              <Switch 
                id="marketing" 
                checked={preferences.marketing} 
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, marketing: checked})
                }
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomize(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
