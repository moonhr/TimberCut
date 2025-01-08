import * as THREE from "three";

/**
 * ThreeDModelGenerator
 * - Three.js를 활용해 3D 모델을 생성하는 클래스.
 */
export class ThreeDModelGenerator {
  private scene: THREE.Scene;
  private material: THREE.Material;

  constructor(scene: THREE.Scene) {
    // Three.js Scene 객체를 전달받아 사용
    this.scene = scene;
    this.material = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // 기본 목재 색상
  }

  /**
   * 3D 모델을 생성하는 메서드
   * @param data - InputProcessor에서 가공된 데이터
   * @returns 생성된 3D 모델 객체
   */
  public generateModel(data: {
    dimensions: { length: number; width: number; thickness: number };
    shape: string;
    material: string;
  }): THREE.Mesh {
    const { dimensions, shape } = data;

    let geometry: THREE.BufferGeometry;

    // 입력된 모양에 따라 적절한 Geometry 생성
    switch (shape) {
      case "rectangle":
        geometry = new THREE.BoxGeometry(
          dimensions.length,
          dimensions.thickness,
          dimensions.width
        );
        break;
      case "circle":
        geometry = new THREE.CylinderGeometry(
          dimensions.width / 2,
          dimensions.width / 2,
          dimensions.thickness,
          32
        );
        break;
      case "custom":
        throw new Error("Custom shape generation is not implemented yet.");
      default:
        throw new Error("Unsupported shape type.");
    }

    // 3D 모델 생성
    const mesh = new THREE.Mesh(geometry, this.material);

    // Three.js 장면에 추가
    this.scene.add(mesh);

    return mesh;
  }

  /**
   * 3D 모델의 색상을 변경하는 메서드
   * @param color - 변경할 색상 (16진수 또는 문자열)
   */
  public setModelColor(color: number | string): void {
    (this.material as THREE.MeshStandardMaterial).color.set(color);
  }
}
