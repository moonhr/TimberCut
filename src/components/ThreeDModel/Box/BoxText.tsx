import React from "react";
import { Text } from "@react-three/drei";

interface BoxTextProps {
  pxDimensions: { length: number; width: number; thickness: number };
  lineOffset: number;
  textScale: number;
  length: number;
  width: number;
  thickness: number;
  showUnits: boolean;
}

const BoxText: React.FC<BoxTextProps> = ({
  pxDimensions,
  lineOffset,
  textScale,
  length,
  width,
  thickness,
  showUnits,
}) => {
  return (
    <>
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
    </>
  );
};

export default BoxText;
