import * as THREE from "three";

export abstract class BaseProcessing {
  protected baseGeometry: THREE.BufferGeometry;

  constructor(baseGeometry: THREE.BufferGeometry) {
    this.baseGeometry = baseGeometry;

    // 기본 영역 설정
    this.baseGeometry.computeBoundingBox();
    if (!this.baseGeometry.boundingBox) {
      throw new Error("Failed to compute bounding box for baseGeometry.");
    }
  }

  /**
   * 값을 제한하는 헬퍼 메서드
   * @param value number - 제한할 값
   * @param min number - 최소값
   * @param max number - 최대값
   * @returns number
   */
  protected clampValue(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * 좌표를 제한하는 헬퍼 메서드
   * BoxGeometry의 parameters를 기준으로 좌표 제한
   * @param x number - X 좌표
   * @param y number - Y 좌표
   * @returns { x: number; y: number }
   */
  protected getGeometryDimensions(): {
    width: number;
    height: number;
    depth: number;
  } {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }

    const box = this.baseGeometry.boundingBox!;
    return {
      width: box.max.x - box.min.x,
      height: box.max.y - box.min.y,
      depth: box.max.z - box.min.z,
    };
  }

  protected clampCoordinates(x: number, y: number): { x: number; y: number } {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }

    const box = this.baseGeometry.boundingBox!;

    return {
      x: this.clampValue(x, box.min.x, box.max.x),
      y: this.clampValue(y, box.min.z, box.max.z), // BoxGeometry에서는 Z축이 평면의 Y축이 됨
    };
  }

  /**
   * 가공 작업을 수행하는 추상 메서드
   * @param parameters 객체 형태로 가공에 필요한 값을 전달
   * @returns THREE.BufferGeometry
   */
  abstract apply(parameters: Record<string, number>): THREE.BufferGeometry;
}
