import gameRoutes from './game.routes.js';

async function apiRoutes (fastify, options) {
  fastify.register(gameRoutes, { prefix: '/game' });
}

export default apiRoutes;