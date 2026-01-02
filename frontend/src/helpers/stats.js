class Stats {
  constructor() {
    this.lastPoints = 0;
    this.lastWords = 0;
    this.bestWords = 0;
    this.bestPoints = 0;
    this.totalWords = 0;
    this.totalPoints = 0;
  }

  reset() {
    this.lastPoints = 0;
    this.lastWords = 0;
  }

  loadFromStorage() {
    const storedStats = JSON.parse(localStorage.getItem('WC_stats'));
    if (storedStats) {
      this.bestWords = storedStats.bestWords;
      this.bestPoints = storedStats.bestPoints;
      this.totalWords = storedStats.totalWords;
      this.totalPoints = storedStats.totalPoints;
    }
  }

  store() {
    localStorage.setItem(
      'WC_stats',
      JSON.stringify({
        bestPoints: this.bestPoints,
        bestWords: this.bestWords,
        totalPoints: this.totalPoints,
        totalWords: this.totalWords,
      }),
    );
  }
}

export default Stats;
