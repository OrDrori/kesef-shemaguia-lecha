/**
 * 📋 העתק את כל הקוד הזה והדבק ב-Cloudflare Worker Editor
 * 
 * Cloudflare Workers API for Kesef Shemaguia Lecha
 * Backend API endpoints for analytics, forms, and future features
 */

// CORS headers for allowing frontend to call this API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: POST /api/analytics - Track questionnaire completion
    if (url.pathname === '/api/analytics' && request.method === 'POST') {
      try {
        const data = await request.json();

        // Insert analytics event into D1
        await env.DB.prepare(
          'INSERT INTO analytics (event, data, timestamp) VALUES (?, ?, ?)'
        )
          .bind(
            data.event,
            JSON.stringify(data.answers || {}),
            data.timestamp || new Date().toISOString()
          )
          .run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to save analytics' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Route: POST /api/contact - Save contact form submissions
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const data = await request.json();

        await env.DB.prepare(
          'INSERT INTO contacts (name, email, message, timestamp) VALUES (?, ?, ?, ?)'
        )
          .bind(
            data.name,
            data.email,
            data.message,
            new Date().toISOString()
          )
          .run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to save contact' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Route: GET /api/stats - Get usage statistics
    if (url.pathname === '/api/stats' && request.method === 'GET') {
      try {
        const result = await env.DB.prepare(
          'SELECT COUNT(*) as total FROM analytics WHERE event = ?'
        )
          .bind('questionnaire_completed')
          .first();

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to get stats' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Default: 404
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};

// ✅ אחרי שהדבקת את הקוד:
// 1. לחץ "Save and Deploy"
// 2. לך ל-Settings → Bindings
// 3. הוסף D1 Binding: Variable name = "DB", Database = "kesef-db"
// 4. העתק את ה-Worker URL ועדכן ב-client/src/lib/api.ts
