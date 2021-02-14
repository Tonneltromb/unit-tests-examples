import * as Hapi from "@hapi/hapi";

import { registerRoutes } from "./routes";

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  registerRoutes(server);

  await server.start();
};

export default start;
