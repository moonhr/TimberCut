import Scene from "../three/Scene";
import * as THREE from "three";

export class IntegrationManager {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public updateModel(input: {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  }): void {
    // 기존 모델 제거
    this.scene.clearScene();

    // 새로운 모델 생성 및 추가
    const geometry =
      input.shape === "rectangle"
        ? new THREE.BoxGeometry(input.length, input.thickness, input.width)
        : new THREE.CylinderGeometry(
            input.width / 2,
            input.width / 2,
            input.thickness,
            32
          );

    const material = new THREE.MeshStandardMaterial({
      color: input.material === "wood" ? 0x8b4513 : 0xd3d3d3, // 나무색 또는 합판색
    });

    const model = new THREE.Mesh(geometry, material);
    this.scene.addModel(model);
  }
}
