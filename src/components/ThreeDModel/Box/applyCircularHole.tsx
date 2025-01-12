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
  // CylinderGeometry 생성 (원형 구멍의 모델링)
  const holeGeometry = new THREE.CylinderGeometry(radius, radius, 1000, 32);
  // holeGeometry.rotateX(Math.PI / 2);
  holeGeometry.rotateY(Math.PI / 2);
  holeGeometry.translate(x, y, 0); // 사용자가 지정한 좌표로 이동

  // CSG를 사용하여 원형 구멍 생성
  const csgBase = CSG.fromMesh(new THREE.Mesh(baseGeometry));
  const csgHole = CSG.fromMesh(new THREE.Mesh(holeGeometry));

  // 차집합 연산으로 구멍 생성
  const subtracted = csgBase.subtract(csgHole);

  // 결과를 Three.js BufferGeometry로 변환하여 반환
  const resultMesh = CSG.toMesh(
    subtracted,
    new THREE.Matrix4(),
    new THREE.MeshStandardMaterial()
  );
  return resultMesh.geometry as THREE.BufferGeometry;
};
