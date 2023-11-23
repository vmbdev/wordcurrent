import readline from 'readline';
import fs from 'fs';

class WordList {
  constructor(options) {
    this.availableWordpacks = options.wordpacks;
    this.flow = options.flow;
    this.levels = Object.keys(this.flow).map(i => Number.parseInt(i));
  }

  load() {
    this.packs = {};

    for (const pack of this.availableWordpacks) {
      this.loadWordList(pack);
    }
  }

   loadWordList(pack) {
    const rl = readline.createInterface({
      input: fs.createReadStream(`./backend/assets/lists/${pack}`)
    });

    this.packs[pack] = {};

    for (const level of this.levels) {
      this.packs[pack][level] = [];
    }

    rl.on('line', (line) => {
      if (this.levels.includes(line.length)) {
        this.packs[pack][line.length].push(line);
      }
    })
  }

  generateSet(language) {
    const wordSet = {};

    for (const level of this.levels) {
      wordSet[level] =
        this.generateList(level, this.flow[level].words, language);
    }

    return wordSet;
  }

  generateList(length, words, language) {
    if (!this.levels.includes(length)) {
      throw new Error('Word lenght out of bounds');
    }

    if (words === -1) words = 20;

    const wordList = [];
    const pack = this.packs[language][length];

    while (wordList.length !== words) {
      const index = Math.floor(Math.random() * (pack.length));
      const word = pack[index];

      if (!wordList.includes(word)) wordList.push(word);
    }

    return wordList;
  }
}

export default WordList;