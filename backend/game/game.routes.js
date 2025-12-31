import GameController from './game.controller.js';

function gameRoutes (fastify, options, done) {
  fastify.get('/start/:language', GameController.start);
  fastify.get('/attempt/:attemptedWord/:key', GameController.attempt);
  fastify.get('/wordpacks', GameController.getWordpacks);
  fastify.get('/status/:key', GameController.status);

  done();
}

export default gameRoutes;