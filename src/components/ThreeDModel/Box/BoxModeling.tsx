import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { useProcessingContext } from "@/context/ProcessingContext";
import { UnitConverter } from "@/core/UnitConverter";
import PreviewModeling from "./PreviewModeling";
import { CircularHoleProcessing } from "@/core/Processing/CircularHoleProcessing";
import { RoundEdgeProcessing } from "@/core/Processing/RoundEdgeProcessing";
import { GrooveProcessing } from "@/core/Processing/GrooveProcessing";
import {
  CircularHoleParameters,
  GrooveParameters,
  RoundEdgeParameters,
} from "@/core/types/ProcessingTypes";

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
  const { operations, selectedOperation, processingParameters } =
    useProcessingContext();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  const baseGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      pxDimensions.width,
      pxDimensions.thickness,
      pxDimensions.length
    );
  }, [pxDimensions]);

  // 실제 가공 적용
  useEffect(() => {
    let currentGeometry = baseGeometry.clone() as THREE.BoxGeometry;

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
          currentGeometry as THREE.BoxGeometry
        );
        currentGeometry = circularHoleProcessor.apply(
          operation.parameters as CircularHoleParameters
        ) as THREE.BoxGeometry;
      }
      if (operation.name === "Round Edge") {
        const roundEdgeProcessor = new RoundEdgeProcessing(
          currentGeometry as THREE.BoxGeometry
        );
        currentGeometry = roundEdgeProcessor.apply(
          operation.parameters as RoundEdgeParameters
        ) as THREE.BoxGeometry;
      }
      if (operation.name === "Groove") {
        const grooveProcessor = new GrooveProcessing(
          currentGeometry as THREE.BoxGeometry
        );
        currentGeometry = grooveProcessor.apply(
          operation.parameters as GrooveParameters
        ) as THREE.BoxGeometry;
      }
    });

    setGeometry(currentGeometry);
  }, [operations, baseGeometry, unit]);

  if (!geometry) return null;

  return (
    <>
      <mesh castShadow={true} geometry={geometry}>
        <meshStandardMaterial
          color="white"
          metalness={0.1}
          roughness={0.9}
          transparent={true}
          opacity={material ? 0 : 1}
        />
      </mesh>
      {material && (
        <lineSegments geometry={new THREE.EdgesGeometry(geometry)}>
          <lineBasicMaterial color="black" />
        </lineSegments>
      )}
      <PreviewModeling
        selectedOperation={selectedOperation}
        processingParameters={processingParameters}
        baseGeometry={baseGeometry}
        unit={unit}
        pxDimensions={pxDimensions}
      />
    </>
  );
};

export default BoxModeling;
