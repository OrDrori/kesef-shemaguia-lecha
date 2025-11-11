import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            כסף שמגיע לך 💚
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
            יש הרבה עזרה שהמדינה נותנת.
            <br />
            בוא נבדוק ביחד מה מגיע לך.
          </p>
        </div>

        {/* Supporting text */}
        <div className="space-y-3">
          <p className="text-xl md:text-2xl text-foreground">
            זה לוקח רק 2 דקות.
          </p>
          <p className="text-xl md:text-2xl text-foreground">
            אנחנו נראה לך בדיוק מה לעשות.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="text-2xl md:text-3xl px-12 py-8 h-auto rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => setLocation('/questionnaire')}
          >
            בוא נתחיל →
          </Button>
        </div>

        {/* Bottom reassurance */}
        <p className="text-lg text-muted-foreground pt-6">
          זה בחינם. זה פשוט. זה זכות שלך.
        </p>
      </div>

      {/* Decorative elements for warmth */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
