import { BaseProcessing } from "./BaseProcessing";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { GrooveParameters } from "@/core/types/ProcessingTypes";

export class GrooveProcessing extends BaseProcessing {
  constructor(baseGeometry: THREE.BufferGeometry) {
    super(baseGeometry);
  }

  apply(parameters: GrooveParameters): THREE.BufferGeometry {
    this.validateParameters(parameters);
    console.log(this.baseGeometry);

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

  private validateParameters(params: GrooveParameters): void {
    const dimensions = this.getGeometryDimensions();
    const { baseHeight, grooveDepth, grooveLength } = params;

    if (baseHeight + grooveLength > dimensions.height) {
      throw new Error("홈의 높이가 지오메트리 높이를 초과합니다");
    }

    if (grooveDepth > dimensions.width) {
      throw new Error("홈의 깊이가 지오메트리 너비를 초과합니다");
    }
  }
}
