import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import PersonalStory from "@/components/PersonalStory";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            כסף שמגיע לכם 💚
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
            יש הרבה עזרה שהמדינה נותנת.
            <br />
            בואו נבדוק ביחד מה מגיע לכם.
          </p>
        </div>

        {/* Supporting text */}
        <div className="space-y-3">
          <p className="text-xl md:text-2xl text-foreground">
            זה לוקח רק 2 דקות.
          </p>
          <p className="text-xl md:text-2xl text-foreground">
            אנחנו נראה לכם בדיוק מה לעשות.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-2xl md:text-3xl px-12 py-8 h-auto rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => setLocation('/questionnaire')}
          >
            בוא נתחיל →
          </Button>
          <Button
            size="lg"
            variant="destructive"
            className="text-xl md:text-2xl px-8 py-6 h-auto rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => setLocation('/urgent')}
          >
            🚨 אני צריך כסף עכשיו
          </Button>
        </div>

        {/* Bottom reassurance */}
        <p className="text-lg text-muted-foreground pt-6">
          זה בחינם. זה פשוט. זה זכות שלכם.
        </p>

        {/* Personal Story */}
        <div className="mt-16 max-w-3xl mx-auto">
          <PersonalStory />
        </div>

        {/* Subtle Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            רוצים לעזור לנו להמשיך לפתח ולשפר את האתר?{' '}
            <Link href="/donate">
              <a className="text-green-600 hover:text-green-700 underline">
                לחצו כאן
              </a>
            </Link>
          </p>
        </footer>
      </div>

      {/* Decorative elements for warmth */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
