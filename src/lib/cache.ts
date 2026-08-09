export function generateETag(content: string): string {
  const hash = Bun.hash(content);
  return `"${hash.toString(16)}"`;
}

export function checkETag(req: Request, etag: string): boolean {
  const ifNoneMatch = req.headers.get("if-none-match");
  return ifNoneMatch === etag;
}

export function addCacheHeaders(response: Response, maxAge: number = 3600): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", `public, max-age=${maxAge}`);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function notModifiedResponse(etag: string): Response {
  return new Response(null, {
    status: 304,
    headers: {
      ETag: etag,
    },
  });
}
