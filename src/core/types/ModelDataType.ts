import * as THREE from "three";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";

export type ModelDataType = {
  title: string;
  modelingData: {
    geometry: THREE.BufferGeometry;
    length: number;
    width: number;
    thickness: number;
    unit: "mm" | "inch" | "cm" | "ft";
    pxDimensions: {
      length: number;
      width: number;
      thickness: number;
    };
    operations: ProcessingOperation[];
  };
};
