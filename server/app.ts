import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT, URI } from "./src/config/config.js";
import { adminjsOptions, buildAdminJSRouter } from "./src/config/setup.js";

const startServer = async () => {
  await connectDB(URI);

  const app = Fastify({ logger: true });

  await buildAdminJSRouter(app);

  try {
    // Declare a route
    app.get("/", async function handler(request, reply) {
      reply.send({ hello: "world" });
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
