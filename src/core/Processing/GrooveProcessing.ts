import { BaseProcessing } from "./BaseProcessing";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { GrooveParameters } from "@/ts/types/ProcessingTypes";

export class GrooveProcessing extends BaseProcessing {
  constructor(baseGeometry: THREE.BufferGeometry) {
    super(baseGeometry);
  }

  apply(parameters: GrooveParameters): THREE.BufferGeometry {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }
    const box = this.baseGeometry.boundingBox!;

    const { baseHeight, grooveDepth, grooveLength } = parameters;

    const grooveGeometry = new THREE.BoxGeometry(
      grooveDepth,
      grooveLength,
      box.max.z - box.min.z
    );

    grooveGeometry.translate(
      box.min.x + grooveDepth / 2,
      box.min.y + baseHeight + grooveLength / 2,
      box.min.z + (box.max.z - box.min.z) / 2
    );

    const baseMesh = new THREE.Mesh(this.baseGeometry);
    const grooveMesh = new THREE.Mesh(grooveGeometry);

    const baseCSG = CSG.fromMesh(baseMesh);
    const grooveCSG = CSG.fromMesh(grooveMesh);

    const result = baseCSG.subtract(grooveCSG);

    return CSG.toMesh(result, new THREE.Matrix4()).geometry;
  }
}
