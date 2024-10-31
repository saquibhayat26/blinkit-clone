import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";

const startServer = async () => {
  await connectDB(process.env.MONGO_URI as string);

  const app = Fastify({ logger: true });

  const port = process.env.PORT || 3000;

  try {
    // Declare a route
    app.get("/", async function handler(request, reply) {
      reply.send({ hello: "world" });
    });

    // Run the server!
    app.listen(
      { port: port as number, host: "0.0.0.0" },
      function (err, address) {
        if (err) {
          app.log.error(err);
          process.exit(1);
        } else {
          app.log.info(`server listening on ${address}`);
        }
      }
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
