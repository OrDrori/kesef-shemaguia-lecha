import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAnalyticsSummary, exportAnalyticsCSV, clearAnalytics } from '@/lib/analytics';
import { Download, Trash2, BarChart3, Users, MousePointerClick, Share2, AlertCircle } from 'lucide-react';

export default function Analytics() {
  const [summary, setSummary] = useState<ReturnType<typeof getAnalyticsSummary> | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = () => {
    setSummary(getAnalyticsSummary());
    setLastUpdate(new Date());
  };

  const handleExport = () => {
    const csv = exportAnalyticsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `kesef-analytics-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל נתוני האנליטיקס?')) {
      clearAnalytics();
      loadSummary();
    }
  };

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-lg text-muted-foreground">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
              <BarChart3 className="h-10 w-10" />
              סטטיסטיקות האתר
            </h1>
            <p className="text-muted-foreground">
              עדכון אחרון: {lastUpdate.toLocaleString('he-IL')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button onClick={loadSummary} variant="outline">
              <BarChart3 className="h-4 w-4 ml-2" />
              רענן נתונים
            </Button>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 ml-2" />
              ייצא ל-CSV
            </Button>
            <Button onClick={handleClear} variant="destructive">
              <Trash2 className="h-4 w-4 ml-2" />
              מחק נתונים
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">סך כניסות</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.totalSessions}</div>
                <p className="text-xs text-muted-foreground">מספר המבקרים הייחודיים</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">צפיות בעמודים</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.pageviews}</div>
                <p className="text-xs text-muted-foreground">סך כל הצפיות</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">השלמת שאלון</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.questionnaireCompletes}</div>
                <p className="text-xs text-muted-foreground">משתמשים שסיימו את השאלון</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">רמה 2</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.level2Starts}</div>
                <p className="text-xs text-muted-foreground">משתמשים שהתחילו רמה 2</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">שיתופים בוואטסאפ</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.whatsappShares}</div>
                <p className="text-xs text-muted-foreground">משתמשים ששיתפו תוצאות</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">עזרה דחופה</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.urgentHelpVisits}</div>
                <p className="text-xs text-muted-foreground">ביקורים בעמוד עזרה דחופה</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Programs */}
          <Card>
            <CardHeader>
              <CardTitle>התוכניות הפופולריות ביותר</CardTitle>
              <CardDescription>
                התוכניות שנצפו הכי הרבה פעמים על ידי המשתמשים
              </CardDescription>
            </CardHeader>
            <CardContent>
              {summary.topPrograms.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  אין עדיין נתונים על צפייה בתוכניות
                </p>
              ) : (
                <div className="space-y-4">
                  {summary.topPrograms.map((program, index) => (
                    <div key={program.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{program.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {program.id}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-primary">{program.views}</p>
                        <p className="text-xs text-muted-foreground">צפיות</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">💡 מידע חשוב</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <ul className="space-y-2">
                <li>• כל הנתונים נשמרים באופן מקומי בדפדפן שלך</li>
                <li>• אין שליחת מידע לשרתים חיצוניים</li>
                <li>• הנתונים פרטיים לחלוטין ולא מזהים משתמשים</li>
                <li>• ניתן לייצא את הנתונים ל-CSV לניתוח מתקדם</li>
                <li>• הנתונים יישמרו עד שתמחק אותם או תנקה את הדפדפן</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
