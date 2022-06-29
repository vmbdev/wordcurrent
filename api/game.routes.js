import GameController from './game.controller.js';

async function gameRoutes (fastify, options, done) {
  fastify.get('/start/:language', GameController.start);
  fastify.get('/attempt/:attemptedWord/:key', GameController.attempt);
  fastify.get('/wordpacks', GameController.wordPacks);

  done();
}

export default gameRoutes;