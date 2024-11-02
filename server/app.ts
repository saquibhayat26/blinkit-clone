import "dotenv/config";
import Fastify from "fastify";
import { Socket } from "socket.io";
import fastifySocketIO from "fastify-socket.io";
import { connectDB } from "./src/config/connect.js";
import { PORT, URI } from "./src/config/config.js";
import { adminjsOptions, buildAdminJSRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";

declare module "fastify" {
  interface FastifyInstance {
    io: Socket;
  }
}

const startServer = async () => {
  await connectDB(URI);

  const app = Fastify({ logger: true });

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

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

    app.ready().then(() => {
      app.io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("joinRoom", (orderId: string) => {
          socket.join(orderId);
          console.log(`🆗 User joined room: ${orderId}`);
        });

        socket.on("disconnect", () => {
          console.log("❌ a user disconnected");
        });
      });
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
