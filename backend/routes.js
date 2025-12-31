import gameRoutes from './game/game.routes.js';

function routes (fastify, options, done) {
  fastify.register((fastify, options, done) => {
    fastify.register(gameRoutes, { prefix: '/game' });
    done();
  }, { prefix: '/api' });

  fastify.get('/', (req, reply) => {
    return reply.sendFile('index.html');
  });

  done();
}

export default routes;