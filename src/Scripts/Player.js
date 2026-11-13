
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
  #myAnimation;
  #isDying = false;
  #deathTimer = 0;
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
    this.#myAnimation = this.object.userData.animator;

    this.#lifeImages = Array.from(
      document.querySelectorAll('#vidas img')
    );
  }

 
  update(dt) {
    const jump = Input.getButton('Jump');

    // Animação de morte
    if (this.#isDying) {
      this.#deathTimer += dt;
      this.#jumpPressed = jump;

      if (this.#deathTimer >= 0.8) {
        this.#finishDeath();
      }

      return;
    }

    // Movimento horizontal
    this.#horizontal = Input.getAxis('Horizontal');

    // Salto e salto duplo
    if (jump && !this.#jumpPressed) {
      if (this.#grounded) {
        this.#playerRb.applyImpulse(
          { x: 0, y: this.jumpPower },
          true
        );

        this.#canDoubleJump = true;
        this.#grounded = false;

      } else if (this.#canDoubleJump) {
        this.#canDoubleJump = false;

        this.#playerRb.setLinvel(
          {
            x: this.#playerRb.linvel().x,
            y: 0
          },
          true
        );

        this.#playerRb.applyImpulse(
          { x: 0, y: this.jumpPower / 1.75 },
          true
        );
      }
    }

    this.#jumpPressed = jump;

    // Atualizar os parâmetros das animações
    this.#myAnimation?.setFloat(
      'verticalSpeed',
      this.#playerRb.linvel().y
    );

    this.#myAnimation?.setFloat(
      'grounded',
      this.#grounded ? 1 : 0
    );
  }



  fixedUpdate() {
    if (this.#isDying) return;

    this.#handleMovement();
  }



  onCollisionEnter(other) {
    if (this.#isDying) return;

    if (other.userData.tag === 'platform') {
      this.#grounded = true;
      this.#canDoubleJump = false;
      this.#lastPlatform = other;
    }

    if (other.userData.tag === 'limit' && this.lives > 0) {
      this.lives--;

      // Esconder uma vida
      this.#lifeImages[this.lives].hidden = true;

      // Iniciar a animação de morte
      this.#startDeath();
    }
  }




  #handleMovement() {
    if (this.#isDying) return;

    const walking = Input.getButton('Walk');

    const speedMultiplier = walking ? 0.4 : 1;

    this.#playerRb.setLinvel(
      {
        x: this.#horizontal * this.movementSpeed * speedMultiplier,
        y: this.#playerRb.linvel().y
      },
      true
    );

    this.#myAnimation.setFloat(
      'speed',
      Math.abs(this.#horizontal) * speedMultiplier
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


  #startDeath() {
    if (this.#isDying) return;

    this.#isDying = true;
    this.#deathTimer = 0;
    this.#horizontal = 0;

    this.#myAnimation?.setFloat('isDead', 1);
    this.#myAnimation?.setFloat('speed', 0);

    this.#playerRb.setLinvel({ x: 0, y: 0 }, true);
    this.#playerRb.setGravityScale(0, true);
  }

  
  #finishDeath() {
    // Verificar se acabou o jogo
    if (this.lives === 0) {
      SceneManager.loadScene('gameover');
      return;
    }

    // Escolher o local de respawn
    let respawn;

    if (this.#checkpointPosition) {
      respawn = this.#checkpointPosition;

    } else if (this.#lastPlatform) {
      respawn = {
        x: this.#lastPlatform.position.x,
        y: this.#lastPlatform.position.y + 2
      };

    } else {
      respawn = { x: 0, y: 1 };
    }

    // Reposicionar o jogador
    this.#playerRb.setTranslation(respawn, true);
    this.#playerRb.setLinvel({ x: 0, y: 0 }, true);
    this.#playerRb.setGravityScale(1, true);

    // Restaurar o movimento
    this.#grounded = false;
    this.#canDoubleJump = false;
    this.#isDying = false;
    this.#deathTimer = 0;

    // Voltar à animação normal
    this.#myAnimation?.setFloat('isDead', 0);
    this.#myAnimation?.setFloat('grounded', 0);
    this.#myAnimation?.setFloat('verticalSpeed', 0);
  }



}
