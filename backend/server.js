import Fastify from 'fastify';
import cors from '@fastify/cors';
import fstatic from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import routes from './routes.js';
import wordlist from './wordlist/wordlistinstance.js';
import { server } from './config/wordcurrent.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: (process.env.NODE_ENV !== 'production')
});

if (server.enableCors && server.corsOrigin) {
  fastify.register(cors, { origin: server.corsOrigin });
}

fastify.register(fstatic, { root: path.join(__dirname, '../frontend/dist') });
fastify.register(routes);

wordlist.load();

fastify.listen({ port: process.env.PORT || server.port }, (err, addresses) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  for (const address of fastify.addresses()) {
    console.log(
      `Server listening on http://${address.address}:${address.port}.`
    );
  }
});