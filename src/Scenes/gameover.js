import './menu.css';
import { SceneManager } from '../Scripts/SceneManager.js';

// Mostrar a pontuação final
const score = Number(localStorage.getItem('score')) || 0;

document.querySelector('#finalScore').textContent = score;

// Voltar ao menu principal
document.querySelector('#btnMenu').addEventListener('click', () => {
  SceneManager.loadScene('index');
});
