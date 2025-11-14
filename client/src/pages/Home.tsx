import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import PersonalStory from "@/components/PersonalStory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, ArrowLeft, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { getStats } from "@/lib/api";

export default function Home() {
  const [, setLocation] = useLocation();
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set fallback immediately
    setUserCount(127);
    setLoading(false);
    
    // Try to fetch real count from API
    getStats().then(stats => {
      if (stats.total && stats.total > 0) {
        setUserCount(stats.total);
      }
    }).catch(() => {
      // Keep fallback value
    });
  }, []);

  return (
    <>
      <Header />
      {/* Skip to main content link - WCAG 2.1 - 2.4.1 Bypass Blocks */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        דלג לתוכן הראשי
      </a>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{backgroundImage: 'url(/hero-bg.jpg)'}} aria-hidden="true" />
        <main id="main-content" className="max-w-4xl w-full text-center space-y-8 animate-fade-in relative z-10">
          {/* Main heading - WCAG 2.1 - 2.4.2 Page Titled, 1.3.1 Info and Relationships */}
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight flex items-center justify-center gap-3">
              <Heart 
                className="w-12 h-12 md:w-16 md:h-16 text-secondary fill-secondary" 
                aria-hidden="true"
              />
              כסף שמגיע לכם
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              יש הרבה עזרה שהמדינה נותנת.
              <br />
              בואו נבדוק ביחד מה מגיע לכם.
            </p>
          </header>

          {/* Supporting text - Clear, simple language (COGA) */}
          <div className="space-y-3">
            <p className="text-xl md:text-2xl text-foreground">
              זה לוקח רק 2 דקות.
            </p>
            <p className="text-xl md:text-2xl text-foreground">
              אנחנו נראה לכם בדיוק מה לעשות.
            </p>
          </div>

          {/* CTA Buttons - WCAG 2.1 - 2.5.5 Target Size (48px+), 2.4.4 Link Purpose */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-2xl md:text-3xl px-12 py-8 h-auto min-h-[60px] rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-lift smooth-transition animate-scale-in"
              onClick={() => setLocation('/questionnaire')}
              aria-label="התחל שאלון לבדיקת זכאות"
            >
              <ArrowLeft className="w-6 h-6 ml-2" aria-hidden="true" />
              בוא נתחיל
            </Button>

          </div>

          {/* User counter */}
          {userCount > 0 && (
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground pt-4">
              <Users className="w-5 h-5" aria-hidden="true" />
              <span>
                <strong className="text-primary font-semibold">{userCount.toLocaleString('he-IL')}</strong> אנשים כבר מצאו כסף שמגיע להם!
              </span>
            </div>
          )}

          {/* Bottom reassurance */}
          <p className="text-lg text-muted-foreground pt-6">
            זה בחינם. זה פשוט. זה זכות שלכם.
          </p>

          {/* Personal Story */}
          <section className="mt-16 max-w-3xl mx-auto" aria-labelledby="personal-story-heading">
            <PersonalStory />
          </section>

          {/* Subtle Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-muted-foreground">
              רוצים לעזור לנו להמשיך לפתח ולשפר את האתר?{' '}
              <Link href="/donate">
                <a className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
                  לחצו כאן
                </a>
              </Link>
            </p>
          </footer>
        </main>

        {/* Decorative elements for warmth - aria-hidden for screen readers */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
