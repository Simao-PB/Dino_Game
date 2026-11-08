
import { Input } from './Input.js';
import { Time } from './Time.js';

export class GameManager {
  isPaused = false;
  pauseMenu = null;
  music = null;

  #pausePressed = false;

  update() {
    const pause = Input.getButton('Pause');

    if (pause && !this.#pausePressed) {
      this.isPaused = !this.isPaused;

      if (this.isPaused) {
        this.pauseGame();
      } else {
        this.resumeGame();
      }
    }

    this.#pausePressed = pause;
  }

  pauseGame() {
    Time.timeScale = 0;

    // Mostrar o menu de pausa
    if (this.pauseMenu) {
      this.pauseMenu.hidden = false;
    }

    // Pausar a música
    if (this.music) {
      this.music.pause();
    }
  }

  resumeGame() {
    Time.timeScale = 1;

    // Esconder o menu de pausa
    if (this.pauseMenu) {
      this.pauseMenu.hidden = true;
    }

    // Retomar a música
    if (this.music) {
      this.music.play().catch(() => {});
    }
  }
}
