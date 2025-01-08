import { Canvas } from "@react-three/fiber";
import { RotationSwitch } from "./RotationSwitch";
import { UnitSwitch } from "./UnitSwitch";
import { MaterialSwitch } from "./MaterialSwitch";
import { useRef, useState } from "react";
import * as THREE from "three";

export const ThreeDModel = () => {
  const [dimensions, setDimensions] = useState({
    length: 1,
    width: 1,
    thickness: 1,
  });
  return (
    <div className="flex flex-col items-center justify-center bg-slate-400 w-full">
      {/* Three.js Viewer */}
      <Canvas className="w-full" camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Box dimensions={dimensions} />
      </Canvas>
      <div className="flex flex-row gap-2 p-2">
        <RotationSwitch />
        <UnitSwitch />
        <MaterialSwitch />
      </div>
    </div>
  );
};

// Box 컴포넌트
const Box = ({
  dimensions,
}: {
  dimensions: { length: number; width: number; thickness: number };
}) => {
  const boxRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={boxRef}>
      {/* 박스의 크기 조정 */}
      <boxGeometry
        args={[dimensions.length, dimensions.thickness, dimensions.width]}
      />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
