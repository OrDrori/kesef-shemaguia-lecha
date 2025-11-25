import { Heart } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
          {/* About */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">אודות האתר</h3>
            <p className="text-sm text-muted-foreground">
              כלי חינמי שעוזר לכם למצוא את כל הכסף והסיוע שמגיע לכם מהמדינה.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">קישורים</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                עמוד הבית
              </Link>
              <Link href="/urgent" className="hover:text-primary transition-colors">
                עזרה דחופה
              </Link>
              <Link href="/donate" className="hover:text-primary transition-colors">
                תרומה
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">תמיכה</h3>
            <p className="text-sm text-muted-foreground">
              האתר נבנה בהתנדבות כדי לעזור לאנשים.
              <br />
              אם אתם יכולים לעזור -{" "}
              <Link href="/donate" className="text-primary hover:underline">
                נשמח לתרומה
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span>נבנה באהבה</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>כדי לעזור לאנשים</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} כסף שמגיע לך • כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
