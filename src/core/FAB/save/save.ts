import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";
import * as THREE from "three";
import { UnitType } from "@/core/types/ModelDataType";
interface SaveModelData {
  title: string;
  modelingData: {
    geometry: THREE.BufferGeometry;
    length: number;
    width: number;
    thickness: number;
    unit: UnitType;
    pxDimensions: { length: number; width: number; thickness: number };
    operations: ProcessingOperation[];
  };
}

export const saveModel = (modelData: SaveModelData) => {
  try {
    const savedModels = JSON.parse(
      localStorage.getItem("SaveModelData") || "[]"
    );
    savedModels.push(modelData);
    localStorage.setItem("SaveModelData", JSON.stringify(savedModels));
    return true;
  } catch (error) {
    console.error("Failed to save model:", error);
    return false;
  }
};
