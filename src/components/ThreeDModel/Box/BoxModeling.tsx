import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { CircularHoleProcessing } from "@/core/Processing/CircularHoleProcessing";
import { useProcessingContext } from "@/context/ProcessingContext";
import { UnitConverter } from "@/core/UnitConverter";

interface BoxModelingProps {
  material: boolean;
  pxDimensions: { length: number; width: number; thickness: number };
  unit: "mm" | "cm" | "inch" | "ft";
}

const BoxModeling: React.FC<BoxModelingProps> = ({
  material,
  pxDimensions,
  unit,
}) => {
  const { operations } = useProcessingContext();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let baseGeometry = new THREE.BoxGeometry(
      pxDimensions.width,
      pxDimensions.thickness,
      pxDimensions.length
    );

    const convertedOperations = operations.map((operation) => ({
      ...operation,
      parameters: Object.entries(operation.parameters).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: UnitConverter.convertToMm(value as number, unit),
        }),
        {}
      ),
    }));

    convertedOperations.forEach((operation) => {
      if (operation.name === "Circular Hole") {
        const circularHoleProcessor = new CircularHoleProcessing(
          baseGeometry as THREE.BoxGeometry
        );
        baseGeometry = circularHoleProcessor.apply(
          operation.parameters as { x: number; y: number; radius: number }
        ) as THREE.BoxGeometry;
      }
    });

    setGeometry(baseGeometry);
  }, [operations, pxDimensions, unit]);

  if (!geometry) {
    return null;
  }

  return (
    <>
      {material ? (
        <>
          <mesh castShadow={true} geometry={geometry}>
            <meshStandardMaterial
              color="white"
              metalness={0.1}
              roughness={0.9}
              transparent={true}
              opacity={0.3}
            />
          </mesh>
          <lineSegments geometry={new THREE.EdgesGeometry(geometry)}>
            <lineBasicMaterial color="black" />
          </lineSegments>
        </>
      ) : (
        <mesh castShadow={true} geometry={geometry}>
          <meshStandardMaterial
            color="white"
            metalness={0.1}
            roughness={0.9}
            transparent={false}
          />
        </mesh>
      )}
    </>
  );
};

export default BoxModeling;
