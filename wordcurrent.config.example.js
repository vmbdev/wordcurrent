export const server = {
  port: 5010,
  enableCors: true,
  corsOrigin: 'http://localhost:3000'
};

export const game = {
  wordpacks: ['castellano', 'english'],
  time: 60,
  // key implies the length of the word, i.e. 4 for "sale", 5 for "crazy", 6 for "shovel", etc
  flow: {
    4: {
      words: 3,
      points: 1
    },
    5: {
      words: 3,
      points: 2
    },
    6: {
      // words: -1 implies infinite words, makes the game run until time is out
      words: -1,
      points: 3
    }
  }
};
