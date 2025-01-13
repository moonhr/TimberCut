import { BaseProcessing } from "./BaseProcessing";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

export class CircularHoleProcessing extends BaseProcessing {
  constructor(baseGeometry: THREE.BufferGeometry) {
    super(baseGeometry);
    console.log("=== 원형 구멍 연산 시작 ===");
  }

  apply(parameters: {
    x: number;
    y: number;
    radius: number;
  }): THREE.BufferGeometry {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }
    const box = this.baseGeometry.boundingBox!;

    // 구멍 위치 계산 (기존 방식 유지)
    const holeX = box.min.x + parameters.y;
    const holeY = box.min.z + parameters.x;

    // 구멍용 실린더 생성
    const height = box.max.y * 2;
    const cylinderGeometry = new THREE.CylinderGeometry(
      parameters.radius,
      parameters.radius,
      height,
      32
    );

    // 실린더 위치 조정 및 회전
    cylinderGeometry.translate(holeX, box.min.y + height / 2, holeY);

    // CSG 연산 수행
    const baseMesh = new THREE.Mesh(this.baseGeometry);
    const holeMesh = new THREE.Mesh(cylinderGeometry);

    const baseCSG = CSG.fromMesh(baseMesh);
    const holeCSG = CSG.fromMesh(holeMesh);

    const result = baseCSG.subtract(holeCSG);

    // 결과 반환
    return CSG.toMesh(result, new THREE.Matrix4()).geometry;
  }
}
