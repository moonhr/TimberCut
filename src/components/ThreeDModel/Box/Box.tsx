import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useModelingContext } from "@/context/ModelingContext";
import BoxModeling from "./BoxModeling";
import BoxText from "./BoxText";

interface BoxProps {
  enableRotation: boolean;
  showUnits: boolean;
  material: boolean;
}

export const Box: React.FC<BoxProps> = ({
  enableRotation,
  showUnits,
  material,
}) => {
  const { length, width, thickness, pxDimensions, unit } = useModelingContext();
  const groupRef = useRef<THREE.Group>(null);

  const textScale = useMemo(() => {
    const maxDimension = Math.max(
      pxDimensions.width,
      pxDimensions.length,
      pxDimensions.thickness
    );
    return maxDimension * 0.1;
  }, [pxDimensions]);

  const lineOffset = useMemo(() => {
    const maxDimension = Math.max(
      pxDimensions.width,
      pxDimensions.length,
      pxDimensions.thickness
    );
    return maxDimension * 0.1;
  }, [pxDimensions]);

  useFrame(() => {
    if (enableRotation && groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <BoxModeling
        material={material}
        pxDimensions={pxDimensions}
        unit={unit}
      />

      <BoxText
        pxDimensions={pxDimensions}
        lineOffset={lineOffset}
        textScale={textScale}
        length={length}
        width={width}
        thickness={thickness}
        showUnits={showUnits}
      />
    </group>
  );
};

export default Box;
