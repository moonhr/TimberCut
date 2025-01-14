import { CSG } from "three-csg-ts";
import * as THREE from "three";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";

export const applyProcessing = (
  geometry: THREE.BufferGeometry,
  operations: ProcessingOperation[]
): THREE.BufferGeometry => {
  let modifiedGeometry = geometry.clone();

  operations.forEach((operation) => {
    const { name, parameters } = operation;

    switch (name) {
      case "Round Edge":
        modifiedGeometry = applyRoundEdge(modifiedGeometry, parameters);
        break;

      case "Circular Hole":
        modifiedGeometry = applyCircularHole(modifiedGeometry, parameters);
        break;

      case "Groove":
        modifiedGeometry = applyGroove(modifiedGeometry, parameters);
        break;

      default:
        console.warn(`Unknown processing name: ${name}`);
    }
  });

  return modifiedGeometry;
};

// 각 작업별 처리 함수

/**
 * Round Edge 처리
 * @param geometry 기존 Geometry
 * @param parameters { topRightRadius, topLeftRadius, bottomRightRadius, bottomLeftRadius }
 * @returns 처리된 Geometry
 */
const applyRoundEdge = (
  geometry: THREE.BufferGeometry,
  parameters: { [key: string]: number }
): THREE.BufferGeometry => {
  const { topRightRadius, topLeftRadius, bottomRightRadius, bottomLeftRadius } =
    parameters;

  const corners = [
    { radius: topRightRadius, position: "topRight" },
    { radius: topLeftRadius, position: "topLeft" },
    { radius: bottomRightRadius, position: "bottomRight" },
    { radius: bottomLeftRadius, position: "bottomLeft" },
  ];

  let modifiedGeometry = geometry.clone();

  corners.forEach(({ radius, position }) => {
    if (radius > 0) {
      const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial();
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      // 모서리 위치 설정
      const cornerPosition = getCornerPosition(geometry, radius, position);
      sphere.position.set(cornerPosition.x, cornerPosition.y, cornerPosition.z);

      // Boolean 연산
      const baseCSG = CSG.fromMesh(new THREE.Mesh(modifiedGeometry));
      const sphereCSG = CSG.fromMesh(sphere);
      const resultCSG = baseCSG.subtract(sphereCSG);

      modifiedGeometry = CSG.toMesh(
        resultCSG,
        new THREE.Matrix4(),
        new THREE.MeshBasicMaterial()
      ).geometry;
    }
  });

  return modifiedGeometry;
};

/**
 * Circular Hole 처리
 * @param geometry 기존 Geometry
 * @param parameters { radius, x, y }
 * @returns 처리된 Geometry
 */
const applyCircularHole = (
  geometry: THREE.BufferGeometry,
  parameters: { radius: number; x: number; y: number }
): THREE.BufferGeometry => {
  const { radius, x, y } = parameters;

  const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, 100, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial();
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  cylinder.position.set(x, y, 0);
  cylinder.rotation.x = Math.PI / 2;

  const baseCSG = CSG.fromMesh(new THREE.Mesh(geometry));
  const cylinderCSG = CSG.fromMesh(cylinder);
  const resultCSG = baseCSG.subtract(cylinderCSG);

  return CSG.toMesh(
    resultCSG,
    new THREE.Matrix4(),
    new THREE.MeshBasicMaterial()
  ).geometry;
};

/**
 * Groove 처리
 * @param geometry 기존 Geometry
 * @param parameters { depth, width, position }
 * @returns 처리된 Geometry
 */
const applyGroove = (
  geometry: THREE.BufferGeometry,
  parameters: { depth: number; width: number; position: number }
): THREE.BufferGeometry => {
  const { depth, width, position } = parameters;

  const grooveGeometry = new THREE.BoxGeometry(width, depth, 100);
  const grooveMaterial = new THREE.MeshBasicMaterial();
  const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);

  groove.position.set(position, 0, 0);

  const baseCSG = CSG.fromMesh(new THREE.Mesh(geometry));
  const grooveCSG = CSG.fromMesh(groove);
  const resultCSG = baseCSG.subtract(grooveCSG);

  return CSG.toMesh(
    resultCSG,
    new THREE.Matrix4(),
    new THREE.MeshBasicMaterial()
  ).geometry;
};

/**
 * 모서리 위치를 계산합니다.
 * @param geometry 기존 Geometry
 * @param radius 모서리 반지름
 * @param corner 위치 이름 ("topRight", "topLeft", "bottomRight", "bottomLeft")
 * @returns 모서리 위치
 */
const getCornerPosition = (
  geometry: THREE.BufferGeometry,
  radius: number,
  corner: string
): { x: number; y: number; z: number } => {
  const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());

  switch (corner) {
    case "topRight":
      return {
        x: center.x + size.x / 2 - radius,
        y: center.y + size.y / 2 - radius,
        z: 0,
      };
    case "topLeft":
      return {
        x: center.x - size.x / 2 + radius,
        y: center.y + size.y / 2 - radius,
        z: 0,
      };
    case "bottomRight":
      return {
        x: center.x + size.x / 2 - radius,
        y: center.y - size.y / 2 + radius,
        z: 0,
      };
    case "bottomLeft":
      return {
        x: center.x - size.x / 2 + radius,
        y: center.y - size.y / 2 + radius,
        z: 0,
      };
    default:
      throw new Error(`Invalid corner: ${corner}`);
  }
};
