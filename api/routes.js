import gameRoutes from './game.routes.js';

async function routes (fastify, options, done) {
  fastify.register((fastify, options, done) => {
    fastify.register(gameRoutes, { prefix: '/game' });
    done();
  }, { prefix: '/api' });

  fastify.get('/', async (req, reply) => {
    reply.sendFile('index.html');
  });

  done();
}

export default routes;