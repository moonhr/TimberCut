import React, { createContext, useContext, useState, useEffect } from "react";
import { UnitConverter } from "@/core/UnitConverter";
import { NumberRounder } from "@/utils/NumberRounder";
import * as THREE from "three";
import { UnitType } from "@/core/types/ModelDataType";

// Context에서 관리할 데이터의 타입
interface ModelingContextData {
  length: number;
  width: number;
  thickness: number;
  unit: UnitType;
  pxDimensions: { length: number; width: number; thickness: number };
  setLength: (value: number) => void;
  setWidth: (value: number) => void;
  setThickness: (value: number) => void;
  setUnit: (unit: UnitType) => void;
  convertToUnit: (targetUnit: UnitType) => void;
  currentGeometry: THREE.BufferGeometry | null;
  setCurrentGeometry: (geometry: THREE.BufferGeometry | null) => void;
}

// Context 초기값
const initialContextData: ModelingContextData = {
  length: 1200,
  width: 600,
  thickness: 20,
  unit: "mm",
  pxDimensions: { length: 1200, width: 600, thickness: 20 },
  setLength: () => {},
  setWidth: () => {},
  setThickness: () => {},
  setUnit: () => {},
  convertToUnit: () => {},
  currentGeometry: null,
  setCurrentGeometry: () => {},
};

const ModelingContext = createContext<ModelingContextData>(initialContextData);

// Context Provider
export const ModelingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [length, setLength] = useState<number>(1200);
  const [width, setWidth] = useState<number>(600);
  const [thickness, setThickness] = useState<number>(20);
  const [unit, setUnit] = useState<UnitType>("mm");
  const [pxDimensions, setPxDimensions] = useState<{
    length: number;
    width: number;
    thickness: number;
  }>({ length: 1200, width: 600, thickness: 20 });
  const [currentGeometry, setCurrentGeometry] =
    useState<THREE.BufferGeometry | null>(null);

  const convertToPxFromMm = (mmValue: number): number => {
    return mmValue;
  };

  // pxDimensions 업데이트
  useEffect(() => {
    const mmLength = UnitConverter.convertToMm(length, unit);
    const mmWidth = UnitConverter.convertToMm(width, unit);
    const mmThickness = UnitConverter.convertToMm(thickness, unit);

    setPxDimensions({
      length: NumberRounder.roundToThreeDecimalPlaces(
        convertToPxFromMm(mmLength)
      ),
      width: NumberRounder.roundToThreeDecimalPlaces(
        convertToPxFromMm(mmWidth)
      ),
      thickness: NumberRounder.roundToThreeDecimalPlaces(
        convertToPxFromMm(mmThickness)
      ),
    });
  }, [length, width, thickness, unit]);

  const convertToUnit = (targetUnit: UnitType) => {
    const mmLength = UnitConverter.convertToMm(length, unit);
    const mmWidth = UnitConverter.convertToMm(width, unit);
    const mmThickness = UnitConverter.convertToMm(thickness, unit);

    const convertFromMm = (mmValue: number) => {
      switch (targetUnit) {
        case "mm":
          return mmValue;
        case "cm":
          return UnitConverter.convertMmToCm(mmValue);
        case "inch":
          return UnitConverter.convertMmToInch(mmValue);
        case "ft":
          return UnitConverter.convertMmToFt(mmValue);
        default:
          throw new Error("Unsupported target unit");
      }
    };

    setLength(NumberRounder.roundToThreeDecimalPlaces(convertFromMm(mmLength)));
    setWidth(NumberRounder.roundToThreeDecimalPlaces(convertFromMm(mmWidth)));
    setThickness(
      NumberRounder.roundToThreeDecimalPlaces(convertFromMm(mmThickness))
    );
    setUnit(targetUnit);
  };

  return (
    <ModelingContext.Provider
      value={{
        length,
        width,
        thickness,
        unit,
        pxDimensions,
        setLength,
        setWidth,
        setThickness,
        setUnit,
        convertToUnit,
        currentGeometry,
        setCurrentGeometry,
      }}
    >
      {children}
    </ModelingContext.Provider>
  );
};

// Custom Hook
export const useModelingContext = () => {
  return useContext(ModelingContext);
};
