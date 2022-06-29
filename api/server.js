import Fastify from 'fastify';
import cors from '@fastify/cors';
import fstatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';
import wordlist from './wordlistinstance.js';
import { server } from '../wordcurrent.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: process.env.NODE_ENV === 'production' ? false : true });

if (server.enableCors && server.corsOrigin) fastify.register(cors, { origin: server.corsOrigin });
fastify.register(fstatic, { root: path.join(__dirname, 'dist') });
fastify.register(routes);

wordlist.load();
fastify.listen({ port: process.env.PORT || server.port })
.then(address => { console.log(`Server listening on ${address}`) })
.catch(err => {
  fastify.log.error(err);
  process.exit(1);
});