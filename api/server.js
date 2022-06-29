import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes.js';
import wordlist from './wordlistinstance.js';
import { server } from '../wordcurrent.config.js';

const fastify = Fastify({ logger: process.env.NODE_ENV === 'production' ? false : true });

fastify.register(routes);
if (server.enableCors && server.corsOrigin) fastify.register(cors, { origin: server.corsOrigin });

wordlist.load().then(() => {
  fastify.listen({ port: process.env.PORT || server.port })
  .then(address => { console.log(`Server listening on ${address}`) })
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });
})