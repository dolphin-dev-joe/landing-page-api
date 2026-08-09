import { handle } from "hono/vercel";
import { createApp } from "./app.ts";

const app = createApp();

// Export handler for Vercel
export default handle(app);
