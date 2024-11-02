import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT, URI } from "./src/config/config.js";
import { adminjsOptions, buildAdminJSRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";

const startServer = async () => {
  await connectDB(URI);

  const app = Fastify({ logger: true });

  await registerRoutes(app);

  await buildAdminJSRouter(app);

  try {
    // Declare a route
    app.get("/", async function handler(request, reply) {
      return reply.send({ hello: "world" });
    });

    // Run the server!
    app.listen({ port: PORT }, function (err, address) {
      if (err) {
        app.log.error(err);
        process.exit(1);
      } else {
        app.log.info(
          `server listening on ${address}${adminjsOptions.options.rootPath}`
        );
      }
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
