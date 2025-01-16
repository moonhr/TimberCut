import * as THREE from "three";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";

export type UnitType = "mm" | "inch" | "cm" | "ft";

export type ModelDataType = {
  title: string;
  modelingData: {
    geometry: THREE.BufferGeometry;
    length: number;
    width: number;
    thickness: number;
    unit: UnitType;
    pxDimensions: {
      length: number;
      width: number;
      thickness: number;
    };
    operations: ProcessingOperation[];
  };
};
