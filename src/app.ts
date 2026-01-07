import Fastify from 'fastify'
import userRoutes from './modules/user/user.route.js'
import { userSchemas } from './modules/user/user.schema.js'

const server = Fastify();

async function main() {
    for(const schema of userSchemas) {
        server.addSchema(schema);
    }
    server.register(userRoutes, {prefix: 'api/users'});
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });

    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();

// "dev": "tsnd --respawn --transpile-only --exit-child src/app.ts",