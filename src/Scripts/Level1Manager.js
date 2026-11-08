
export class Level1Manager {
  cloudPrefab1 = null;
  cloudPrefab2 = null;

  constructor(object, scene, scripts) {
    this.object = object;
    this.scene = scene;
    this.scripts = scripts;
  }

  async start() {
    const position = this.object.position;

    // Criar a primeira nuvem
    await this.#instantiate(this.cloudPrefab1, position);

    // Criar a segunda nuvem
    const c2 = await this.#instantiate(
      this.cloudPrefab2,
      position
    );

    // A segunda nuvem move-se para a esquerda
    c2.userData.script.isMovingLeft = true;
  }

  // Criar objetos automaticamente a partir de Prefabs
  async #instantiate(prefab, position) {
    const object = await prefab(position.x, position.y);

    // Adicionar à cena
    this.scene.add(object);

    // Adicionar o script à lista de atualizações
    this.scripts.push(object.userData.script);

    return object;
  }
}
