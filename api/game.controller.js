import { nanoid } from 'nanoid/async';
import wordlist from './wordlistinstance.js';
import knex from './database.js';
import { game } from '../wordcurrent.config.js';

const start = async (request, reply) => {
  const { language } = request.params;
  const key = await nanoid();
  const wordset = wordlist.generateSet(language);

  const res = await knex('games').insert({ key, wordset, time: game.time, points: 0, updated: Date() });
  return res;
}

export default { start };