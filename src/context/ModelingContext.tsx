import React, { createContext, useContext, useState, useEffect } from "react";
import { UnitConverter } from "@/core/UnitConverter";
import { NumberRounder } from "@/utils/NumberRounder";

// Context에서 관리할 데이터의 타입
interface ModelingContextData {
  length: number;
  width: number;
  thickness: number;
  unit: "mm" | "inch" | "cm" | "ft";
  pxDimensions: { length: number; width: number; thickness: number };
  setLength: (value: number) => void;
  setWidth: (value: number) => void;
  setThickness: (value: number) => void;
  setUnit: (unit: "mm" | "inch" | "cm" | "ft") => void;
  convertToUnit: (targetUnit: "mm" | "inch" | "cm" | "ft") => void;
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
};

const ModelingContext = createContext<ModelingContextData>(initialContextData);

// Context Provider
export const ModelingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [length, setLength] = useState<number>(1200);
  const [width, setWidth] = useState<number>(600);
  const [thickness, setThickness] = useState<number>(20);
  const [unit, setUnit] = useState<"mm" | "inch" | "cm" | "ft">("mm");
  const [pxDimensions, setPxDimensions] = useState<{
    length: number;
    width: number;
    thickness: number;
  }>({ length: 1200, width: 600, thickness: 20 });

  // px 변환 (항상 mm 기준으로 변환)
  const convertToPxFromMm = (mmValue: number): number => {
    return mmValue * 3.7795;
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

  const convertToUnit = (targetUnit: "mm" | "inch" | "cm" | "ft") => {
    const toMm = UnitConverter.convertToMm;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fromMm = (value: number, unit: "mm" | "inch" | "cm" | "ft") =>
      UnitConverter.convertToMm(value, targetUnit);

    setLength(
      NumberRounder.roundToThreeDecimalPlaces(fromMm(toMm(length, unit), unit))
    );
    setWidth(
      NumberRounder.roundToThreeDecimalPlaces(fromMm(toMm(width, unit), unit))
    );
    setThickness(
      NumberRounder.roundToThreeDecimalPlaces(
        fromMm(toMm(thickness, unit), unit)
      )
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
