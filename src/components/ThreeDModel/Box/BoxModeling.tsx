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
import { useModelingContext } from "@/context/ModelingContext";
import { UnitType } from "@/core/types/ModelDataType";

interface BoxModelingProps {
  material: boolean;
  pxDimensions: { length: number; width: number; thickness: number };
  unit: UnitType;
}

const BoxModeling: React.FC<BoxModelingProps> = ({
  material,
  pxDimensions,
  unit,
}) => {
  const { operations, selectedOperation, processingParameters } =
    useProcessingContext();
  const { setCurrentGeometry } = useModelingContext();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  const baseGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      pxDimensions.width,
      pxDimensions.thickness,
      pxDimensions.length
    );
  }, [pxDimensions]);

  useEffect(() => {
    let processedGeometry = baseGeometry.clone() as THREE.BufferGeometry;

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

    processedGeometry = convertedOperations.reduce(
      (prevGeometry, operation) => {
        let processor;

        switch (operation.name) {
          case "Circular Hole":
            processor = new CircularHoleProcessing(prevGeometry);
            return processor.apply(
              operation.parameters as CircularHoleParameters
            );

          case "Round Edge":
            processor = new RoundEdgeProcessing(prevGeometry);
            return processor.apply(operation.parameters as RoundEdgeParameters);

          case "Groove":
            processor = new GrooveProcessing(prevGeometry);
            return processor.apply(operation.parameters as GrooveParameters);

          default:
            return prevGeometry;
        }
      },
      processedGeometry
    );

    setGeometry(processedGeometry);
    setCurrentGeometry(processedGeometry);
  }, [operations, baseGeometry, unit, setCurrentGeometry]);

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
