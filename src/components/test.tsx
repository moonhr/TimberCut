"use client";

import { Canvas } from "@react-three/fiber";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import * as THREE from "three";
const Box3D = () => {
  const [dimensions, setDimensions] = useState({
    length: 1,
    width: 1,
    thickness: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "length" | "width" | "thickness"
  ) => {
    const value = parseFloat(e.target.value);
    setDimensions((prev) => ({
      ...prev,
      [field]: value > 0 ? value : prev[field], // Prevent negative or zero dimensions
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 사용자 입력 폼 */}
      <form className="grid grid-cols-3 gap-2 mb-4">
        <label>
          길이:
          <Input
            type="number"
            min="0.1"
            step="0.1"
            onChange={(e) => handleInputChange(e, "length")}
            value={dimensions.length}
          />
        </label>
        <label>
          너비:
          <Input
            type="number"
            min="0.1"
            step="0.1"
            onChange={(e) => handleInputChange(e, "width")}
            value={dimensions.width}
          />
        </label>
        <label>
          두께:
          <Input
            type="number"
            min="0.1"
            step="0.1"
            onChange={(e) => handleInputChange(e, "thickness")}
            value={dimensions.thickness}
          />
        </label>
      </form>

      {/* Three.js Viewer */}
      <Canvas
        style={{ height: "500px", width: "500px" }}
        camera={{ position: [5, 5, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Box dimensions={dimensions} />
      </Canvas>
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

export default Box3D;
