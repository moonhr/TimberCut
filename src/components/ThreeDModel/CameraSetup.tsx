import { useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";

export const CameraSetup = ({
  boxDimensions,
}: {
  boxDimensions: { length: number; width: number; thickness: number };
}) => {
  const { camera } = useThree();

  const calculateDistance = useCallback(() => {
    const maxDimension = Math.max(
      boxDimensions.length,
      boxDimensions.width,
      boxDimensions.thickness
    );
    return maxDimension * 1;
  }, [boxDimensions]);

  useEffect(() => {
    const radius = calculateDistance();
    camera.position.set(radius, radius * 0.5, radius);
    camera.lookAt(0, 0, 0);
  }, [calculateDistance, camera]);

  return null;
};
