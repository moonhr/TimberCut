import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { UnitConverter } from "@/core/UnitConverter";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

interface PreviewModelingProps {
  selectedOperation: string | null;
  processingParameters: Record<string, number> | null;
  baseGeometry: THREE.BufferGeometry;
  unit: "mm" | "cm" | "inch" | "ft";
  pxDimensions: { length: number; width: number; thickness: number };
}

const PreviewModeling: React.FC<PreviewModelingProps> = ({
  selectedOperation,
  processingParameters,
  baseGeometry,
  unit,
  pxDimensions,
}) => {
  const [previewGeometry, setPreviewGeometry] =
    useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (!selectedOperation || !processingParameters) {
      setPreviewGeometry(null);
      return;
    }

    const convertedParams = Object.entries(processingParameters).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: UnitConverter.convertToMm(value as number, unit),
      }),
      {}
    );

    if (selectedOperation === "Circular Hole") {
      const { x, y, radius } = convertedParams as {
        x: number;
        y: number;
        radius: number;
      };

      const previewGeom = new THREE.CylinderGeometry(
        radius,
        radius,
        pxDimensions.thickness,
        32
      );
      previewGeom.translate(0, -pxDimensions.thickness / 2, 0);

      if (!baseGeometry.boundingBox) {
        baseGeometry.computeBoundingBox();
      }
      const box = baseGeometry.boundingBox!;

      const holeX = box.min.x + y;
      const holeZ = box.min.z + x;

      const height = box.max.y * 2;
      previewGeom.translate(holeX, height / 2, holeZ);
      setPreviewGeometry(previewGeom);
    } else if (selectedOperation === "Round Edge") {
      const params = convertedParams as {
        topLeftRadius: number;
        topRightRadius: number;
        bottomLeftRadius: number;
        bottomRightRadius: number;
      };

      if (!baseGeometry.boundingBox) {
        baseGeometry.computeBoundingBox();
      }
      const box = baseGeometry.boundingBox!;

      const corners = [
        {
          position: new THREE.Vector3(box.min.x, box.max.y, box.max.z),
          radius: params.bottomRightRadius,
        },
        {
          position: new THREE.Vector3(box.max.x, box.max.y, box.max.z),
          radius: params.topRightRadius,
        },
        {
          position: new THREE.Vector3(box.min.x, box.max.y, box.min.z),
          radius: params.bottomLeftRadius,
        },
        {
          position: new THREE.Vector3(box.max.x, box.max.y, box.min.z),
          radius: params.topLeftRadius,
        },
      ];

      const previewGeometries: THREE.BufferGeometry[] = [];

      corners.forEach((corner, index) => {
        if (corner.radius > 0) {
          const cornerBox = new THREE.BoxGeometry(
            corner.radius,
            corner.radius,
            corner.radius
          );

          if (index === 0) {
            cornerBox.translate(
              corner.position.x + corner.radius / 2,
              corner.position.y - corner.radius / 2,
              corner.position.z - corner.radius / 2
            );
          } else if (index === 1) {
            cornerBox.translate(
              corner.position.x - corner.radius / 2,
              corner.position.y - corner.radius / 2,
              corner.position.z - corner.radius / 2
            );
          } else if (index === 2) {
            cornerBox.translate(
              corner.position.x + corner.radius / 2,
              corner.position.y - corner.radius / 2,
              corner.position.z + corner.radius / 2
            );
          } else {
            cornerBox.translate(
              corner.position.x - corner.radius / 2,
              corner.position.y - corner.radius / 2,
              corner.position.z + corner.radius / 2
            );
          }

          previewGeometries.push(cornerBox);
        }
      });

      if (previewGeometries.length > 0) {
        const mergedGeometry = mergeGeometries(previewGeometries, false);
        setPreviewGeometry(mergedGeometry);
      } else {
        setPreviewGeometry(null);
      }
    }
  }, [
    selectedOperation,
    processingParameters,
    baseGeometry,
    unit,
    pxDimensions,
  ]);

  if (!previewGeometry) return null;

  return (
    <mesh geometry={previewGeometry}>
      <meshStandardMaterial
        color="red"
        transparent={true}
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default PreviewModeling;
