
import * as THREE from 'three';
import { adicionarCircleCollider } from '../Scripts/Fisica.js';

export function criarCheckpoint(fisica, x, y) {
  const checkpoint = new THREE.Group();

  checkpoint.name = 'Checkpoint';
  checkpoint.userData.tag = 'checkpoint';
  checkpoint.position.set(x, y, 0.7);

  // Mastro da bandeira
  const mastro = new THREE.Mesh(
    new THREE.PlaneGeometry(0.08, 0.9),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );

  mastro.position.set(-0.35, 0, 0);

  // Bandeira amarela
  const bandeira = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 0.35),
    new THREE.MeshBasicMaterial({ color: 0xffd700 })
  );

  bandeira.position.set(0, 0.25, 0.01);

  checkpoint.add(mastro, bandeira);

  // Sensor: deteta o jogador sem bloquear o movimento
  adicionarCircleCollider(fisica, checkpoint, true);

  return checkpoint;
}
