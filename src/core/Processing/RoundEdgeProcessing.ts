import { BaseProcessing } from "./BaseProcessing";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { RoundEdgeParameters } from "@/ts/types/ProcessingTypes";

interface Corner {
  position: THREE.Vector3;
  radius: number;
}

export class RoundEdgeProcessing extends BaseProcessing {
  constructor(baseGeometry: THREE.BufferGeometry) {
    super(baseGeometry);
  }

  apply(parameters: RoundEdgeParameters): THREE.BufferGeometry {
    if (!this.baseGeometry.boundingBox) {
      this.baseGeometry.computeBoundingBox();
    }
    const box = this.baseGeometry.boundingBox!;

    console.log(this.baseGeometry.boundingBox);

    const corners: Corner[] = [
      {
        position: new THREE.Vector3(box.min.x, box.max.y, box.max.z),
        radius: parameters.bottomRightRadius,
      },
      {
        position: new THREE.Vector3(box.min.x, box.max.y, box.min.z),
        radius: parameters.bottomLeftRadius,
      },
      {
        position: new THREE.Vector3(box.max.x, box.max.y, box.max.z),
        radius: parameters.topRightRadius,
      },
      {
        position: new THREE.Vector3(box.max.x, box.max.y, box.min.z),
        radius: parameters.topLeftRadius,
      },
    ];

    const baseMesh = new THREE.Mesh(this.baseGeometry);
    let resultCSG = CSG.fromMesh(baseMesh);

    corners.forEach((corner, index) => {
      const height = box.max.y * 2;

      if (corner.radius > 0) {
        const cornerBox = new THREE.BoxGeometry(
          corner.radius,
          height,
          corner.radius
        );

        if (index === 0) {
          cornerBox.translate(
            corner.position.x + corner.radius / 2,
            corner.position.y - height / 2,
            corner.position.z - corner.radius / 2
          );
        } else if (index === 1) {
          cornerBox.translate(
            corner.position.x + corner.radius / 2,
            corner.position.y - height / 2,
            corner.position.z + corner.radius / 2
          );
        } else if (index === 2) {
          cornerBox.translate(
            corner.position.x - corner.radius / 2,
            corner.position.y - height / 2,
            corner.position.z - corner.radius / 2
          );
        } else {
          cornerBox.translate(
            corner.position.x - corner.radius / 2,
            corner.position.y - height / 2,
            corner.position.z + corner.radius / 2
          );
        }

        const cornerBoxMesh = new THREE.Mesh(cornerBox);
        const cornerCSG = CSG.fromMesh(cornerBoxMesh);

        const cylinder = new THREE.CylinderGeometry(
          corner.radius,
          corner.radius,
          height,
          32
        );

        if (index === 0) {
          cylinder.translate(
            corner.position.x + corner.radius,
            corner.position.y - height / 2,
            corner.position.z - corner.radius
          );
        } else if (index === 1) {
          cylinder.translate(
            corner.position.x + corner.radius,
            corner.position.y - height / 2,
            corner.position.z + corner.radius
          );
        } else if (index === 2) {
          cylinder.translate(
            corner.position.x - corner.radius,
            corner.position.y - height / 2,
            corner.position.z - corner.radius
          );
        } else {
          cylinder.translate(
            corner.position.x - corner.radius,
            corner.position.y - height / 2,
            corner.position.z + corner.radius
          );
        }

        const cylinderMesh = new THREE.Mesh(cylinder);
        const cylinderCSG = CSG.fromMesh(cylinderMesh);

        const roundedCornerCSG = cornerCSG.subtract(cylinderCSG);
        resultCSG = resultCSG.subtract(roundedCornerCSG);
      }
    });
    return CSG.toMesh(resultCSG, new THREE.Matrix4()).geometry;
  }
}
