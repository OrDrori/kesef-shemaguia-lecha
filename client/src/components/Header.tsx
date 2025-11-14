import { Button } from "@/components/ui/button";
import { Heart, AlertCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo - Link to home */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
          <Heart 
            className="w-6 h-6 text-secondary fill-secondary" 
            aria-hidden="true"
          />
          <span className="text-xl font-bold text-foreground">
            כסף שמגיע לך
          </span>
        </Link>
        
        {/* Urgent Help Button */}
        <Button 
          variant="destructive" 
          size="default"
          className="font-semibold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => setLocation('/urgent')}
          aria-label="עזרה דחופה - אני צריך כסף עכשיו"
        >
          <AlertCircle className="w-5 h-5 ml-2" aria-hidden="true" />
          עזרה דחופה
        </Button>
      </div>
    </header>
  );
}
