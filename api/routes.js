import gameRoutes from './game.routes.js';

async function routes (fastify, options, done) {
  fastify.register((fastify, options, done) => {
    fastify.register(gameRoutes, { prefix: '/game' });
    done();
  }, { prefix: '/api' });

  fastify.get('/', async (req, reply) => {
    return { hola: 'hey' }
  });

  done();
}

export default routes;