import {
  getSessionFromRequest,
  validateCredentials,
  createSession,
  generateSessionId,
  setSessionCookie,
  deleteSession,
  clearSessionCookie,
} from "../../lib/session.ts";
import { errorResponse, HttpStatus } from "../../lib/http.ts";

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/health",
    description: "Health check endpoint",
    example: "http://localhost:5000/health",
  },
  {
    method: "GET",
    path: "/api/landing-page",
    description: "Get all landing page data (optimized single call)",
    example: "http://localhost:5000/api/landing-page",
  },
  {
    method: "GET",
    path: "/api/pricing",
    description: "Get all pricing categories with items",
    example: "http://localhost:5000/api/pricing",
  },
  {
    method: "GET",
    path: "/api/perfumes",
    description: "Get all perfume categories with perfumes",
    example: "http://localhost:5000/api/perfumes",
  },
  {
    method: "GET",
    path: "/api/faqs",
    description: "Get all FAQs",
    example: "http://localhost:5000/api/faqs",
  },
  {
    method: "GET",
    path: "/api/testimonials",
    description: "Get all testimonials",
    example: "http://localhost:5000/api/testimonials",
  },
  {
    method: "GET",
    path: "/api/locations",
    description: "Get all store locations",
    example: "http://localhost:5000/api/locations",
  },
  {
    method: "GET",
    path: "/api/contacts",
    description: "Get contact information (WhatsApp, Instagram, etc.)",
    example: "http://localhost:5000/api/contacts",
  },
  {
    method: "GET",
    path: "/api/home-sections",
    description: "Get all home sections",
    example: "http://localhost:5000/api/home-sections",
  },
  {
    method: "GET",
    path: "/api/home-sections/:key",
    description: "Get specific home section by key",
    example: "http://localhost:5000/api/home-sections/hero",
  },
  {
    method: "GET",
    path: "/api/settings",
    description: "Get site settings",
    example: "http://localhost:5000/api/settings",
  },
];

export class DocsController {
  showLoginPage(req: Request): Response {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - API Docs</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 24px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffc107;
      color: #856404;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }
    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
    }
    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
    }
    button:active {
      transform: translateY(0);
    }
    .error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h1>🔒 API Documentation</h1>
    <p class="subtitle">Development Mode Only</p>

    <div class="warning">
      ⚠️ This page is only accessible in development mode. Not available in production.
    </div>

    ${req.url.includes("error=1") ? '<div class="error">Invalid username or password</div>' : ""}

    <form method="POST" action="/docs/login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required autofocus placeholder="admin">
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required placeholder="••••••••">
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  async handleLogin(req: Request): Promise<Response> {
    const formData = await req.formData();
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!validateCredentials(username, password)) {
      return Response.redirect("/docs/login?error=1", 302);
    }

    const sessionId = generateSessionId();
    createSession(sessionId);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/docs",
        "Set-Cookie": setSessionCookie(sessionId),
      },
    });
  }

  handleLogout(req: Request): Response {
    const session = getSessionFromRequest(req);
    if (session) {
      deleteSession(session.id);
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/docs/login",
        "Set-Cookie": clearSessionCookie(),
      },
    });
  }

  showApiDocs(req: Request): Response {
    const session = getSessionFromRequest(req);
    if (!session) {
      return Response.redirect("/docs/login", 302);
    }

    const endpointsList = API_ENDPOINTS.map(
      (endpoint) => `
      <div class="endpoint">
        <div class="method ${endpoint.method.toLowerCase()}">${endpoint.method}</div>
        <div class="endpoint-info">
          <div class="path">${endpoint.path}</div>
          <div class="description">${endpoint.description}</div>
          <div class="example">
            <a href="${endpoint.example}" target="_blank">${endpoint.example}</a>
          </div>
        </div>
      </div>
    `
    ).join("");

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f7fa;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 {
      color: #333;
      font-size: 28px;
    }
    .subtitle {
      color: #666;
      margin-top: 8px;
      font-size: 14px;
    }
    .logout-btn {
      padding: 10px 20px;
      background: #dc3545;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      transition: background 0.3s;
    }
    .logout-btn:hover {
      background: #c82333;
    }
    .warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px 20px;
      border-radius: 6px;
      margin-bottom: 30px;
      color: #856404;
      font-size: 14px;
    }
    .endpoints {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .endpoints h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .endpoint {
      display: flex;
      gap: 15px;
      padding: 20px;
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      margin-bottom: 15px;
      transition: box-shadow 0.3s;
    }
    .endpoint:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .method {
      flex-shrink: 0;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 12px;
      text-align: center;
      min-width: 60px;
      height: fit-content;
    }
    .method.get {
      background: #d4edda;
      color: #155724;
    }
    .endpoint-info {
      flex: 1;
    }
    .path {
      font-family: 'Courier New', monospace;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }
    .description {
      color: #666;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .example {
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    .example a {
      color: #667eea;
      text-decoration: none;
    }
    .example a:hover {
      text-decoration: underline;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 5px;
    }
    .stat-label {
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>📚 API Documentation</h1>
        <p class="subtitle">Dolphin Laundry Landing Page API</p>
      </div>
      <a href="/docs/logout" class="logout-btn">Logout</a>
    </div>

    <div class="warning">
      ⚠️ <strong>Development Mode Only:</strong> This documentation page is only accessible in development environment.
      It will not be available in production deployments.
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${API_ENDPOINTS.length}</div>
        <div class="stat-label">Total Endpoints</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">READ-ONLY</div>
        <div class="stat-label">API Type</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">PostgreSQL</div>
        <div class="stat-label">Database (Neon)</div>
      </div>
    </div>

    <div class="endpoints">
      <h2>Available Endpoints</h2>
      ${endpointsList}
    </div>
  </div>
</body>
</html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }
}

export const docsController = new DocsController();
