import { BaseProcessing } from "./BaseProcessing";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { CircularHoleParameters } from "@/core/types/ProcessingTypes";

export class CircularHoleProcessing extends BaseProcessing {
  constructor(baseGeometry: THREE.BufferGeometry) {
    super(baseGeometry);
  }

  apply(parameters: CircularHoleParameters): THREE.BufferGeometry {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }
    const box = this.baseGeometry.boundingBox!;

    const holeX = box.min.x + parameters.y;
    const holeY = box.min.z + parameters.x;

    const height = box.max.y * 2;
    const cylinderGeometry = new THREE.CylinderGeometry(
      parameters.radius,
      parameters.radius,
      height,
      32
    );

    cylinderGeometry.translate(holeX, box.min.y + height / 2, holeY);

    const baseMesh = new THREE.Mesh(this.baseGeometry);
    const holeMesh = new THREE.Mesh(cylinderGeometry);

    const baseCSG = CSG.fromMesh(baseMesh);
    const holeCSG = CSG.fromMesh(holeMesh);

    const result = baseCSG.subtract(holeCSG);

    return CSG.toMesh(result, new THREE.Matrix4()).geometry;
  }
}
