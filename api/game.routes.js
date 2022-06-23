import GameController from './game.controller.js';

async function gameRoutes (fastify, options, done) {
  fastify.get('/start/:language', GameController.start);
  done();
}

export default gameRoutes;