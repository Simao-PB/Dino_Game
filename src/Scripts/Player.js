
import { Input } from './Input.js';
import { SceneManager } from './SceneManager.js';

export class Player {
  #playerRb;
  #horizontal = 0;
  #grounded;
  #canDoubleJump;
  #jumpPressed = false;
  #lifeImages = [];
  #lastPlatform = null;
  #checkpointPosition = null;

  movementSpeed = 1;
  jumpPower = 40;
  lives = 3;

  constructor(object) {
    this.object = object;
    this.object.userData.script = this;
  }

  start() {
    this.#playerRb = this.object.userData.rigidBody;
    this.#grounded = true;
    this.#canDoubleJump = false;

    this.#lifeImages = Array.from(
      document.querySelectorAll('#vidas img')
    );
  }

  update() {
    this.#horizontal = Input.getAxis('Horizontal');

    const jump = Input.getButton('Jump');

    if (jump && !this.#jumpPressed) {
      if (this.#grounded) {
        this.#playerRb.applyImpulse(
          { x: 0, y: this.jumpPower }, true
        );

        this.#canDoubleJump = true;
        this.#grounded = false;
      } else if (this.#canDoubleJump) {
        this.#canDoubleJump = false;

        this.#playerRb.setLinvel(
          { x: this.#playerRb.linvel().x, y: 0 },
          true
        );

        this.#playerRb.applyImpulse(
          { x: 0, y: this.jumpPower / 1.75 },
          true
        );
      }
    }

    this.#jumpPressed = jump;
  }

  fixedUpdate() {
    this.#handleMovement();
  }

  onCollisionEnter(other) {
    if (other.userData.tag === 'platform') {
      this.#grounded = true;
      this.#canDoubleJump = false;
      this.#lastPlatform = other;
    }

    if (other.userData.tag === 'limit' && this.lives > 0) {
      this.lives--;

      // Esconder uma vida
      this.#lifeImages[this.lives].hidden = true;

      // Verificar se acabou o jogo
      if (this.lives === 0) {
        SceneManager.loadScene('gameover');
        return;
      }

      // Escolher onde o jogador vai reaparecer
      let respawn;

      if (this.#checkpointPosition) {
        // Reaparecer no último checkpoint
        respawn = this.#checkpointPosition;

      } else if (this.#lastPlatform) {
        // Se ainda não passou num checkpoint,
        // voltar à última plataforma
        respawn = {
          x: this.#lastPlatform.position.x,
          y: this.#lastPlatform.position.y + 2
        };

      } else {
        // Posição inicial de segurança
        respawn = { x: 0, y: 1 };
      }

      // Mover o Rigidbody para o respawn
      this.#playerRb.setTranslation(respawn, true);

      // Parar a velocidade da queda
      this.#playerRb.setLinvel({ x: 0, y: 0 }, true);



      this.#grounded = false;
      this.#canDoubleJump = false;
    }
  }

  #handleMovement() {
    this.#playerRb.setLinvel(
      {
        x: this.#horizontal * this.movementSpeed,
        y: this.#playerRb.linvel().y
      },
      true
    );
  }

  
  onTriggerEnter(other) {
    if (other.userData.tag === 'checkpoint') {

      this.#checkpointPosition = {
        x: other.position.x,
        y: other.position.y + 1
      };

      console.log('Checkpoint ativado!');
    }
  }

}
