import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface BoxModelingProps {
  material: boolean;
  pxDimensions: { length: number; width: number; thickness: number };
}

const BoxModeling: React.FC<BoxModelingProps> = ({
  material,
  pxDimensions,
}) => {
  const woodTexture = useLoader(THREE.TextureLoader, "/textures/wood.jpg");

  // 기본 BoxGeometry 생성
  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(
      pxDimensions.width,
      pxDimensions.thickness,
      pxDimensions.length
    );
  }, [pxDimensions]);

  return (
    <mesh castShadow={true} geometry={geometry}>
      <meshStandardMaterial
        key={material ? "wood" : "white"}
        attach="material"
        color={material ? undefined : "white"}
        map={material ? woodTexture : null}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

export default BoxModeling;
