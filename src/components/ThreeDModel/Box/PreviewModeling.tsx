import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useProcessingContext } from "@/context/ProcessingContext";
import { useModelingContext } from "@/context/ModelingContext";
import { UnitConverter } from "@/core/UnitConverter";

interface PreviewModelingProps {
  pxDimensions: { length: number; width: number; thickness: number };
  unit: "mm" | "cm" | "inch" | "ft";
}

const PreviewModeling: React.FC<PreviewModelingProps> = ({
  pxDimensions,
  unit,
}) => {
  const { selectedOperation, processingParameters } = useProcessingContext();
  const { length, width, thickness } = useModelingContext();
  const [previewGeometries, setPreviewGeometries] = useState<
    THREE.BufferGeometry[]
  >([]);

  useEffect(() => {
    const newPreviewGeometries: THREE.BufferGeometry[] = [];

    // 현재 선택된 작업과 파라미터로 미리보기 생성
    if (selectedOperation && processingParameters) {
      const convertedParams = Object.entries(processingParameters).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: UnitConverter.convertToMm(value as number, unit),
        }),
        {}
      );

      switch (selectedOperation) {
        case "Circular Hole": {
          const { x, y, radius } = convertedParams as {
            x: number;
            y: number;
            radius: number;
          };
          const previewGeometry = new THREE.CylinderGeometry(
            radius,
            radius,
            pxDimensions.thickness,
            32
          );
          previewGeometry.rotateX(Math.PI / 2);

          // 구멍 위치 계산 (CircularHoleProcessing과 동일한 방식)
          const box = new THREE.Box3().setFromObject(
            new THREE.Mesh(previewGeometry)
          );
          const holeX = box.min.x + y;
          const holeY = -box.min.z - x;

          previewGeometry.translate(holeX, holeY, 0);
          newPreviewGeometries.push(previewGeometry);
          break;
        }
        case "Round Edge": {
          const params = convertedParams as {
            topLeftRadius: number;
            topRightRadius: number;
            bottomLeftRadius: number;
            bottomRightRadius: number;
          };

          const corners = [
            {
              x: -pxDimensions.width / 2,
              y: pxDimensions.length / 2,
              radius: params.topLeftRadius,
            },
            {
              x: pxDimensions.width / 2,
              y: pxDimensions.length / 2,
              radius: params.topRightRadius,
            },
            {
              x: -pxDimensions.width / 2,
              y: -pxDimensions.length / 2,
              radius: params.bottomLeftRadius,
            },
            {
              x: pxDimensions.width / 2,
              y: -pxDimensions.length / 2,
              radius: params.bottomRightRadius,
            },
          ];

          corners.forEach((corner) => {
            if (corner.radius > 0) {
              const sphereGeometry = new THREE.SphereGeometry(
                corner.radius,
                16,
                16
              );
              sphereGeometry.translate(corner.x, corner.y, 0);
              newPreviewGeometries.push(sphereGeometry);
            }
          });
          break;
        }
      }
    }

    setPreviewGeometries(newPreviewGeometries);
  }, [
    selectedOperation,
    processingParameters,
    pxDimensions,
    unit,
    length,
    width,
    thickness,
  ]);

  return (
    <>
      {previewGeometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          <meshStandardMaterial color="red" transparent={true} opacity={0.5} />
        </mesh>
      ))}
    </>
  );
};

export default PreviewModeling;
