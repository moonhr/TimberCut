import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useModelingContext } from "@/context/ModelingContext";

interface BoxProps {
  enableRotation: boolean;
  showUnits: boolean;
  material: boolean;
}

export const Box = ({ enableRotation, showUnits, material }: BoxProps) => {
  const { length, width, thickness, pxDimensions } = useModelingContext();
  const groupRef = useRef<THREE.Group>(null);

  // 나무 텍스처 로드
  const woodTexture = useLoader(THREE.TextureLoader, "/textures/wood.jpg");

  // 텍스트 크기를 박스 크기에 비례하여 계산
  const textScale = useMemo(() => {
    const maxDimension = Math.max(
      pxDimensions.width,
      pxDimensions.length,
      pxDimensions.thickness
    );
    return maxDimension * 0.1; // 텍스트 크기를 약간 축소
  }, [pxDimensions]);

  // 치수선 간격 조정
  const lineOffset = useMemo(() => {
    const maxDimension = Math.max(
      pxDimensions.width,
      pxDimensions.length,
      pxDimensions.thickness
    );
    return maxDimension * 0.1; // 박스 크기의 20%로 설정
  }, [pxDimensions]);

  // 박스와 텍스트 회전 애니메이션
  useFrame(() => {
    if (enableRotation && groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D 박스 */}
      <mesh castShadow={true}>
        <boxGeometry
          args={[
            pxDimensions.width,
            pxDimensions.thickness,
            pxDimensions.length,
          ]}
        />
        <meshStandardMaterial
          key={material ? "wood" : "white"} // 상태에 따라 키 변경
          attach="material"
          color={material ? undefined : "white"}
          map={material ? woodTexture : null}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* 모서리 부분 추가 */}
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[
            new THREE.BoxGeometry(
              pxDimensions.width,
              pxDimensions.thickness,
              pxDimensions.length
            ),
          ]}
        />
        <lineBasicMaterial color="black" />
      </lineSegments>

      {/* 길이 치수선과 텍스트 */}
      {showUnits && (
        <group position={[-pxDimensions.width / 2 - lineOffset, 0, 0]}>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={
                  new Float32Array([
                    0,
                    0,
                    -pxDimensions.length / 2,
                    0,
                    0,
                    pxDimensions.length / 2,
                  ])
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="black" />
          </line>
          <Text
            position={[-lineOffset, 0, 0]}
            fontSize={textScale}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          >
            {`${length}`}
          </Text>
        </group>
      )}

      {/* 너비 치수선과 텍스트 */}
      {showUnits && (
        <group position={[0, 0, -pxDimensions.length / 2 - lineOffset]}>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={
                  new Float32Array([
                    -pxDimensions.width / 2,
                    0,
                    0,
                    pxDimensions.width / 2,
                    0,
                    0,
                  ])
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="black" />
          </line>
          <Text
            position={[0, 0, -lineOffset]}
            fontSize={textScale}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, 0, Math.PI]}
          >
            {`${width}`}
          </Text>
        </group>
      )}

      {/* 두께 텍스트 (박스 위에 표시) */}
      {showUnits && (
        <Text
          position={[0, pxDimensions.thickness + 0.1 / 2, 0]}
          fontSize={textScale}
          color="black"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        >
          {`${thickness}`}
        </Text>
      )}
    </group>
  );
};

export default Box;
