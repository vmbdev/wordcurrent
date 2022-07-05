import { nanoid } from 'nanoid/async';
import wordlist from './wordlistinstance.js';
import knex from './database.js';
import { game } from '../wordcurrent.config.js';

const scramble = (word) => {
  let scrambled = '';
  word = word.split('');
  while (word.length > 0) scrambled += word.splice(word.length * Math.random() << 0, 1);

  return scrambled;
}

const nextWord = (wordset) => {
  let level = Object.keys(wordset)[0];

  return wordset[level][0];
}

const start = async (req, reply) => {
  const { language } = req.params;
  const key = await nanoid();
  const wordset = wordlist.generateSet(language);

  await knex('games').insert({
    key,
    language,
    wordset,
    time: game.time,
    points: 0,
    timestamp: ~~(Date.now() / 1000)
  });

  return { key, word: scramble(nextWord(wordset)), time: game.time };
}

const attempt = async (req, reply) => {
  const { attemptedWord, key } = req.params;
  const query = await knex('games')
    .select('id', 'language', 'wordset', 'time', 'points', 'timestamp')
    .first()
    .where({ key });
  
  const time = query.time - (~~(Date.now() / 1000) - query.timestamp);
  if (time <= 0) {
    await knex('games').where({ id: query.id }).update({ time: 0 });
    return { points: query.points, attempt: 'timeout' };
  }

  const word = nextWord(query.wordset);
  const { wordset } = query;

  if (word === attemptedWord) {
    const remainingLevels = Object.keys(wordset);
    const currentLevel = remainingLevels[0];
    const points = query.points + game.flow[currentLevel].points;

    // if there's only one word remaining in the current level
    if (wordset[currentLevel].length === 1) {
      // if there's only one level left, refill it
      if (remainingLevels.length === 1)
        wordset[currentLevel] = wordlist.generateList(currentLevel, -1, query.language);
      else delete wordset[currentLevel];
    }
    else wordset[currentLevel].shift();

    await knex('games').where({ id: query.id }).update({ wordset, points });
    return { points, word: scramble(nextWord(wordset)), attempt: 'correct' };
  }
  else return { points: query.points, attempt: 'failed' }
}

const getWordpacks = async () => {
  return { wordpacks: game.wordpacks };
}

const status = async (req, reply) => {
  const { key } = req.params;
  const query = await knex('games').select('time', 'points', 'timestamp').where({ key }).first();
  const time = query.time - (~~(Date.now() / 1000) - query.timestamp);

  return { time: time > 0 ? time : 0, points: query.points };
}

export default { start, attempt, getWordpacks, status };