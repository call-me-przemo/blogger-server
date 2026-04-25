import { serve } from "@hono/node-server";
import { createApp } from "@/create-app";

try {
  const { app, port } = createApp();
  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
} catch (err) {
  console.error(err);
}
