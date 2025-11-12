import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import UrgentHelp from "./pages/UrgentHelp";
import QuestionnaireLevel2 from "./pages/QuestionnaireLevel2";
import ResultsLevel2 from "./pages/ResultsLevel2";
import Donate from "./pages/Donate";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/urgent"} component={UrgentHelp} />
      <Route path={"/questionnaire"} component={Questionnaire} />
      <Route path="/results" component={Results} />
      <Route path="/questionnaire-level2" component={QuestionnaireLevel2} />
      <Route path="/results-level2" component={ResultsLevel2} />
      <Route path="/donate" component={Donate} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
