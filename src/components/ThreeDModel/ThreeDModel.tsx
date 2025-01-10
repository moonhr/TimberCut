import { Canvas } from "@react-three/fiber";
import { RotationSwitch } from "./RotationSwitch";
import { OrbitControls } from "@react-three/drei";
import { SizeSwitch } from "./UnitSwitch";
import { MaterialSwitch } from "./MaterialSwitch";
import { useState } from "react";
import { useModelingContext } from "@/context/ModelingContext";
import { LightSetup } from "./LightSetup";
import { CameraSetup } from "./CameraSetup";
import { Box } from "./Box";

export const ThreeDModel = () => {
  const { pxDimensions } = useModelingContext();
  const [enableRotation, setEnableRotation] = useState(true);
  const [showUnits, setShowUnits] = useState(true);
  const [material, setMaterial] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-400 w-full">
      {/* Three.js Viewer */}
      <Canvas
        className="w-full"
        camera={{ fov: 50, near: 0.1, far: 50000 }}
        shadows={true}
      >
        <LightSetup />
        <CameraSetup boxDimensions={pxDimensions} />
        <Box
          enableRotation={enableRotation}
          showUnits={showUnits}
          material={material}
        />
        <OrbitControls />
      </Canvas>
      <div className="flex flex-row gap-2 p-2">
        <RotationSwitch onToggle={setEnableRotation} />
        <SizeSwitch onToggle={setShowUnits} />
        <MaterialSwitch onToggle={setMaterial} />
      </div>
    </div>
  );
};
