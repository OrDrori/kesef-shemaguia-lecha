import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Heart, Phone, ExternalLink, Building2, Smartphone, CreditCard, Banknote } from "lucide-react";
import DonorsList from "@/components/DonorsList";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function Donate() {
  // Track page view and scroll to top when component mounts
  useEffect(() => {
    trackPageView('donate');
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            רוצים לעזור לנו להמשיך?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            האתר הזה בחינם לגמרי ותמיד יהיה כזה.
            <br />
            אבל אם אתם יכולים ורוצים לעזור - זה יעזור לנו להמשיך לחפש עוד ועוד דרכים לעזור לאנשים.
          </p>
        </div>

        {/* Explanation */}
        <Card className="p-6 mb-8 bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-4">למה התרומות עוזרות?</h2>
          <div className="space-y-3 text-gray-700">
            <p>✅ <strong>תפעול האתר</strong> - שרתים, דומיין, אחסון</p>
            <p>✅ <strong>מחקר מתמיד</strong> - חיפוש תוכניות חדשות, עדכון מידע</p>
            <p>✅ <strong>פיתוח</strong> - הוספת תכונות חדשות, שיפורים</p>
            <p>✅ <strong>תמיכה</strong> - מענה לשאלות, עזרה אישית</p>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-6 mb-8 bg-yellow-50 border-2 border-yellow-200">
          <p className="text-center text-gray-800 font-medium">
            <strong>חשוב:</strong> אין שום חובה לתרום!
            <br />
            האתר נבנה כדי לעזור, לא כדי להרוויח.
            <br />
            רק אם אתם יכולים ורוצים - נשמח מאוד
          </p>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">דרכי תרומה</h2>

          {/* Bit / Paybox */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <Smartphone className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Bit או Paybox</h3>
                <p className="text-gray-600 mb-3">הדרך הכי פשוטה - ישירות מהאפליקציה</p>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-1">מספר טלפון:</p>
                  <p className="text-2xl font-bold text-green-700 dir-ltr">053-303-0931</p>
                </div>
                <Button
                  onClick={() => window.location.href = 'tel:0533030931'}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="ml-2 h-5 w-5" />
                  חייגו למספר
                </Button>
              </div>
            </div>
          </Card>

          {/* PayPal */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">PayPal</h3>
                <p className="text-gray-600 mb-3">תרומה בינלאומית דרך PayPal</p>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">קישור PayPal:</p>
                  <p className="text-lg font-mono text-blue-700 break-all">
                    paypal.me/drorior
                  </p>
                </div>
                <Button
                  onClick={() => window.open('https://www.paypal.me/drorior', '_blank')}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="ml-2 h-5 w-5" />
                  פתחו את PayPal
                </Button>
              </div>
            </div>
          </Card>

          {/* Bank Transfer */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <Building2 className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">העברה בנקאית</h3>
                <p className="text-gray-600 mb-3">העברה ישירה לחשבון הבנק</p>
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">בנק:</span>
                    <span className="font-bold text-gray-800">לאומי (10)</span>
                    
                    <span className="text-gray-600">סניף:</span>
                    <span className="font-bold text-gray-800">944</span>
                    
                    <span className="text-gray-600">חשבון:</span>
                    <span className="font-bold text-gray-800">50148816</span>
                    
                    <span className="text-gray-600">ע.מ:</span>
                    <span className="font-bold text-gray-800">313320129</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200">
                    <p className="text-sm text-gray-600">על שם:</p>
                    <p className="font-bold text-gray-800">אור דרורי - תרומות לאתר "עזרה לזולת"</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Cash */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <Banknote className="h-8 w-8 text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">מזומן</h3>
                <p className="text-gray-600 mb-3">מעדיפים למסור ביד? בואו נתאם</p>
                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">צרו קשר בוואטסאפ:</p>
                  <p className="text-2xl font-bold text-orange-700 dir-ltr">053-303-0931</p>
                </div>
                <Button
                  onClick={() => window.open('https://wa.me/972533030931', '_blank')}
                  className="mt-4 w-full bg-orange-600 hover:bg-orange-700"
                >
                  <Phone className="ml-2 h-5 w-5" />
                  שלחו הודעה בוואטסאפ
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Donor Recognition */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
            רוצים שנציג אתכם באתר?
          </h2>
          <p className="text-gray-700 text-center mb-4">
            אם תרמתם ורוצים שנציג את שמכם, התמונה שלכם, או העסק שלכם באתר -
            <br />
            פשוט שלחו לנו הודעה בוואטסאפ ונתאם את הפרטים.
          </p>
          <p className="text-sm text-gray-600 text-center">
            אתם בוחרים מה להציג: שם, תמונה, עסק, סכום, תאריך - או כלום. הכל בשליטה שלכם
          </p>
        </Card>

        {/* Thank You */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-200">
          <div className="text-center">
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              תודה שאתם כאן
            </h2>
            <p className="text-gray-700 text-lg">
              בין אם תרמתם ובין אם לא -
              <br />
              העובדה שאתם משתמשים באתר ומוצאים עזרה, זה מה שחשוב.
            </p>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowRight className="ml-2 h-5 w-5" />
              חזרו לעמוד הבית
            </Button>
          </Link>
        </div>
      </div>

      {/* Donors List - will show when there are donors */}
      <DonorsList />
    </div>
    <Footer />
    </>
  );
}
