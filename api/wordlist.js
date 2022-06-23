import readline from 'readline/promises';
import fs from 'fs';

class WordList {
  constructor(options) {
    this._availableWordPackages = options.wordPackages;
    this._flow = options.flow;
    this._levels = Object.keys(this._flow).map(i => Number.parseInt(i));
  }

  async load() {
    this._packs = {};

    for (const pack of this._availableWordPackages) {
      await this.loadWordList(pack);
    }
  }

  async loadWordList(pack) {
    const rl = readline.createInterface({ input: fs.createReadStream(`./api/wordlists/${pack}.l`) });
    this._packs[pack] = {};

    for (const level of this._levels) this._packs[pack][level] = [];

    for await (const line of rl) {
      if (this._levels.includes(line.length)) this._packs[pack][line.length].push(line);
    }
  }

  generateSet(language) {
    const wordSet = {};
    for (const level of this._levels)
      wordSet[level] = this.generateList(level, this._flow[level].words, language);

    return wordSet;
  }

  generateList(length, words, language) {
    if (!this._levels.includes(length)) throw new Error('Word lenght out of bounds');

    if (words === -1) words = 20;

    let wordList = [];
    const pack = this._packs[language][length];

    while (wordList.length !== words) {
      const index = Math.floor(Math.random() * (pack.length));
      const word = pack[index];

      if (!wordList.includes(word)) wordList.push(word);
    }

    return wordList;
  }
}

export default WordList;