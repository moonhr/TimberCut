import React from "react";

export const LightSetup: React.FC = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[1, 10, 5]}
        intensity={1}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
};
