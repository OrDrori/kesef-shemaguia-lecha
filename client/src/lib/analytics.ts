/**
 * Simple privacy-focused analytics system
 * Tracks pageviews, user flows, and program interactions
 * All data stored locally in localStorage - no external servers
 */

export interface AnalyticsEvent {
  type: 'pageview' | 'program_view' | 'program_click' | 'questionnaire_complete' | 'level2_start' | 'whatsapp_share' | 'urgent_help';
  page?: string;
  programId?: string;
  programName?: string;
  timestamp: number;
  sessionId: string;
}

export interface AnalyticsSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  events: AnalyticsEvent[];
  userAgent: string;
  referrer: string;
}

const STORAGE_KEY = 'kesef_analytics';
const SESSION_KEY = 'kesef_session_id';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

/**
 * Get or create session ID
 */
function getSessionId(): string {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) {
    return stored;
  }
  
  const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem(SESSION_KEY, newId);
  return newId;
}

/**
 * Get current session or create new one
 */
function getCurrentSession(): AnalyticsSession {
  const sessionId = getSessionId();
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const data = JSON.parse(stored);
      const sessions: AnalyticsSession[] = data.sessions || [];
      
      // Find current session
      const currentSession = sessions.find(s => s.sessionId === sessionId);
      if (currentSession) {
        return currentSession;
      }
    } catch (e) {
      console.error('Failed to parse analytics data:', e);
    }
  }
  
  // Create new session
  const newSession: AnalyticsSession = {
    sessionId,
    startTime: Date.now(),
    events: [],
    userAgent: navigator.userAgent,
    referrer: document.referrer
  };
  
  return newSession;
}

/**
 * Save session to localStorage
 */
function saveSession(session: AnalyticsSession) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let data: { sessions: AnalyticsSession[] } = { sessions: [] };
    
    if (stored) {
      data = JSON.parse(stored);
    }
    
    // Update or add session
    const index = data.sessions.findIndex(s => s.sessionId === session.sessionId);
    if (index >= 0) {
      data.sessions[index] = session;
    } else {
      data.sessions.push(session);
    }
    
    // Keep only last 100 sessions to avoid storage limits
    if (data.sessions.length > 100) {
      data.sessions = data.sessions.slice(-100);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save analytics:', e);
  }
}

/**
 * Track an analytics event
 */
export function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) {
  const session = getCurrentSession();
  
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: Date.now(),
    sessionId: session.sessionId
  };
  
  session.events.push(fullEvent);
  session.endTime = Date.now();
  
  saveSession(session);
}

/**
 * Track page view
 */
export function trackPageView(page: string) {
  trackEvent({ type: 'pageview', page });
}

/**
 * Track program view (when user sees a program in results)
 */
export function trackProgramView(programId: string, programName: string) {
  trackEvent({ type: 'program_view', programId, programName });
}

/**
 * Track program click (when user clicks to see details)
 */
export function trackProgramClick(programId: string, programName: string) {
  trackEvent({ type: 'program_click', programId, programName });
}

/**
 * Track questionnaire completion
 */
export function trackQuestionnaireComplete() {
  trackEvent({ type: 'questionnaire_complete' });
}

/**
 * Track Level 2 start
 */
export function trackLevel2Start() {
  trackEvent({ type: 'level2_start' });
}

/**
 * Track WhatsApp share
 */
export function trackWhatsAppShare() {
  trackEvent({ type: 'whatsapp_share' });
}

/**
 * Track urgent help page visit
 */
export function trackUrgentHelp() {
  trackEvent({ type: 'urgent_help' });
}

/**
 * Get all analytics data
 */
export function getAnalyticsData(): { sessions: AnalyticsSession[] } {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { sessions: [] };
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse analytics data:', e);
    return { sessions: [] };
  }
}

/**
 * Export analytics data as CSV
 */
export function exportAnalyticsCSV(): string {
  const data = getAnalyticsData();
  
  const rows = [
    ['Session ID', 'Event Type', 'Page', 'Program ID', 'Program Name', 'Timestamp', 'User Agent', 'Referrer']
  ];
  
  data.sessions.forEach(session => {
    session.events.forEach(event => {
      rows.push([
        session.sessionId,
        event.type,
        event.page || '',
        event.programId || '',
        event.programName || '',
        new Date(event.timestamp).toISOString(),
        session.userAgent,
        session.referrer
      ]);
    });
  });
  
  return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

/**
 * Clear all analytics data
 */
export function clearAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary() {
  const data = getAnalyticsData();
  
  const totalSessions = data.sessions.length;
  const totalEvents = data.sessions.reduce((sum, s) => sum + s.events.length, 0);
  
  const pageviews = data.sessions.reduce((sum, s) => 
    sum + s.events.filter(e => e.type === 'pageview').length, 0
  );
  
  const questionnaireCompletes = data.sessions.reduce((sum, s) => 
    sum + s.events.filter(e => e.type === 'questionnaire_complete').length, 0
  );
  
  const level2Starts = data.sessions.reduce((sum, s) => 
    sum + s.events.filter(e => e.type === 'level2_start').length, 0
  );
  
  const urgentHelpVisits = data.sessions.reduce((sum, s) => 
    sum + s.events.filter(e => e.type === 'urgent_help').length, 0
  );
  
  const whatsappShares = data.sessions.reduce((sum, s) => 
    sum + s.events.filter(e => e.type === 'whatsapp_share').length, 0
  );
  
  // Most viewed programs
  const programViews: Record<string, { name: string; count: number }> = {};
  data.sessions.forEach(s => {
    s.events.filter(e => e.type === 'program_view').forEach(e => {
      if (e.programId && e.programName) {
        if (!programViews[e.programId]) {
          programViews[e.programId] = { name: e.programName, count: 0 };
        }
        programViews[e.programId].count++;
      }
    });
  });
  
  const topPrograms = Object.entries(programViews)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([id, data]) => ({ id, name: data.name, views: data.count }));
  
  return {
    totalSessions,
    totalEvents,
    pageviews,
    questionnaireCompletes,
    level2Starts,
    urgentHelpVisits,
    whatsappShares,
    topPrograms
  };
}
