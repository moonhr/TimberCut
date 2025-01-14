import React, { useEffect, useState } from "react";
import * as THREE from "three";

import { UnitConverter } from "@/core/UnitConverter";
import { CSG } from "three-csg-ts";

import { RoundEdgeProcessing } from "@/core/Processing/RoundEdgeProcessing";
import { CircularHoleProcessing } from "@/core/Processing/CircularHoleProcessing";
import { GrooveProcessing } from "@/core/Processing/GrooveProcessing";

import {
  GrooveParameters,
  RoundEdgeParameters,
  CircularHoleParameters,
} from "@/core/types/ProcessingTypes";

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

    const createPreviewGeometry = (processedGeometry: THREE.BufferGeometry) => {
      const originalMesh = new THREE.Mesh(baseGeometry);
      const processedMesh = new THREE.Mesh(processedGeometry);

      const originalCSG = CSG.fromMesh(originalMesh);
      const processedCSG = CSG.fromMesh(processedMesh);

      const differenceCSG = originalCSG.subtract(processedCSG);
      return CSG.toMesh(differenceCSG, new THREE.Matrix4()).geometry;
    };

    let processedGeometry: THREE.BufferGeometry;

    if (selectedOperation === "Circular Hole") {
      const holeProcessor = new CircularHoleProcessing(baseGeometry);
      processedGeometry = holeProcessor.apply(
        convertedParams as CircularHoleParameters
      );
    } else if (selectedOperation === "Round Edge") {
      const roundEdgeProcessor = new RoundEdgeProcessing(baseGeometry);
      processedGeometry = roundEdgeProcessor.apply(
        convertedParams as RoundEdgeParameters
      );
    } else if (selectedOperation === "Groove") {
      const grooveProcessor = new GrooveProcessing(baseGeometry);
      processedGeometry = grooveProcessor.apply(
        convertedParams as GrooveParameters
      );
    } else {
      setPreviewGeometry(null);
      return;
    }

    const previewGeometry = createPreviewGeometry(processedGeometry);
    setPreviewGeometry(previewGeometry);
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
