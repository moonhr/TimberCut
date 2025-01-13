import * as THREE from "three";
import { CSG } from "three-csg-ts";

/**
 * 목재 모델링에 원형 구멍을 삽입하는 함수
 * @param baseGeometry THREE.BufferGeometry - 기본 목재 모델링
 * @param x number - 원형의 X 좌표
 * @param y number - 원형의 Y 좌표
 * @param radius number - 원형의 반지름
 * @returns THREE.BufferGeometry - 원형 구멍이 삽입된 목재 모델링
 */
export const applyCircularHole = (
  baseGeometry: THREE.BufferGeometry,
  x: number,
  y: number,
  radius: number
): THREE.BufferGeometry => {
  // baseGeometry의 boundingBox를 계산하여 치수 가져오기
  baseGeometry.computeBoundingBox();
  const boundingBox = baseGeometry.boundingBox;

  if (!boundingBox) {
    throw new Error("Failed to compute bounding box for baseGeometry.");
  }

  const width = boundingBox.max.x - boundingBox.min.x; // baseGeometry의 너비
  const height = boundingBox.max.y - boundingBox.min.y; // baseGeometry의 높이

  // x와 y 좌표를 제한
  const clampedX = Math.max(0, Math.min(x, width)); // 0 ≤ x ≤ 너비
  const clampedY = Math.max(0, Math.min(y, height)); // 0 ≤ y ≤ 높이

  // CylinderGeometry 생성 (원형 구멍의 모델링)
  const holeGeometry = new THREE.CylinderGeometry(radius, radius, 1000, 32);

  // Z축 방향으로 구멍 회전
  holeGeometry.rotateY(Math.PI / 2);

  // 기준점을 baseGeometry의 모서리로 이동
  const offsetX = boundingBox.min.x;
  const offsetY = boundingBox.min.y;

  // 좌표 이동
  holeGeometry.translate(offsetX + clampedX, offsetY + clampedY, 0);

  // CSG를 사용하여 원형 구멍 생성
  const csgBase = CSG.fromMesh(new THREE.Mesh(baseGeometry));
  const csgHole = CSG.fromMesh(new THREE.Mesh(holeGeometry));

  // 차집합 연산으로 구멍 생성
  const subtracted = csgBase.subtract(csgHole);

  // 결과를 Three.js BufferGeometry로 변환하여 반환
  const resultMesh = CSG.toMesh(
    subtracted,
    new THREE.Matrix4(),
    new THREE.MeshStandardMaterial({ color: "blue" }) // 파란색 재질
  );

  return resultMesh.geometry as THREE.BufferGeometry;
};
