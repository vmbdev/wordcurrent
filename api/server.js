import Fastify from 'fastify';
import routes from './routes.js';
import wordlist from './wordlistinstance.js';
import { server } from '../wordcurrent.config.js';

const fastify = Fastify({ logger: process.env.NODE_ENV === 'production' ? false : true });

fastify.register(routes);

wordlist.load().then(() => {
  fastify.listen({ port: process.env.PORT || server.port })
  .then(address => { console.log(`Server listening on ${address}`) })
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });
})