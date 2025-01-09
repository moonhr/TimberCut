import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const CameraSetup = ({
  boxDimensions,
}: {
  boxDimensions: { length: number; width: number; thickness: number };
}) => {
  const { camera } = useThree(); // Three.js 카메라 가져오기

  // 박스 크기에 따른 카메라 거리 계산
  const calculateDistance = () => {
    const maxDimension = Math.max(
      boxDimensions.length,
      boxDimensions.width,
      boxDimensions.thickness
    );
    return maxDimension * 1; // 박스 크기의 3배를 거리로 설정
  };

  // 카메라 위치 초기화
  useEffect(() => {
    const radius = calculateDistance();
    camera.position.set(radius, radius * 0.5, radius); // 카메라 거리 설정
    camera.lookAt(0, 0, 0); // 박스 중심을 바라봄
  }, [boxDimensions]); // 박스 크기가 변경될 때마다 실행

  return null;
};
