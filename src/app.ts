import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt';
import userRoutes from './modules/user/user.route.js'
import { userSchemas } from './modules/user/user.schema.js'
import { productSchemas } from './modules/products/product.schema.js';
import productRoutes from './modules/products/product.route.js';

export const server = Fastify();

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any
    }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fjwt, {
    secret: 'sujon01secret'
})

server.decorate('authenticate', async (request:FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        return reply.send(e);
    }
})


async function main() {
    for(const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }
    server.register(userRoutes, {prefix: 'api/users'});
    server.register(productRoutes, {prefix: 'api/products'});
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });

    console.log(`Server ready at http://localhost:4000`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();

// "dev": "tsnd --respawn --transpile-only --exit-child src/app.ts",