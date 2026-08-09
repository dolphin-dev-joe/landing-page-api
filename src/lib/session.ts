// Simple in-memory session for development only
// DO NOT use in production!

interface Session {
  id: string;
  authenticated: boolean;
  createdAt: number;
}

const sessions = new Map<string, Session>();

// Simple dev credentials - change this!
const DEV_USERNAME = "admin";
const DEV_PASSWORD = "admin123";

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createSession(sessionId: string): Session {
  const session: Session = {
    id: sessionId,
    authenticated: true,
    createdAt: Date.now(),
  };
  sessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId: string): Session | undefined {
  return sessions.get(sessionId);
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function validateCredentials(username: string, password: string): boolean {
  return username === DEV_USERNAME && password === DEV_PASSWORD;
}

export function getSessionFromRequest(req: Request): Session | undefined {
  const cookies = req.headers.get("cookie");
  if (!cookies) return undefined;

  const sessionCookie = cookies.split(";").find((c) => c.trim().startsWith("session="));
  if (!sessionCookie) return undefined;

  const sessionId = sessionCookie.split("=")[1];
  return getSession(sessionId || "");
}

export function setSessionCookie(sessionId: string): string {
  return `session=${sessionId}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`;
}

export function clearSessionCookie(): string {
  return `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`;
}
