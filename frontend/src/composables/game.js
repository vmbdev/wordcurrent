import { ref } from 'vue';

const startNewGame = ref(false);
const currentWordpack = ref('');

export function useGame() {
  const startPressed = () => {
    startNewGame.value = true;
  }

  const selectWordpack = (pack) => {
    currentWordpack.value = pack;
  }

  return {
    startNewGame,
    currentWordpack,
    startPressed,
    selectWordpack,
  }
}
