export interface RequestContext {
  requestId: string;
  startTime: number;
}

export type RouteHandler = (req: Request) => Response | Promise<Response> | null;
