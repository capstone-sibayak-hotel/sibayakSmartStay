require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const routes = require("./routes");
const connectToDB = require("./db_connection");
const Inert = require("@hapi/inert");

(async function () {
  await connectToDB();
  const server = Hapi.server({
    port: process.env.PORT||4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours, adjust as needed
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: artifacts.decoded.payload,
      };
    },
  });

  // Serve static files in `dist/`
  await server.register(require("@hapi/inert"));
  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "dist", // path relative to project root
        index: ["index.html"], // serve index.html by default
      },
    },
    options: {
      auth: false,
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Sever runs at ${server.info.uri}`);
})();
