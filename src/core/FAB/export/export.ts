import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { STLExporter } from "three/addons/exporters/STLExporter.js";
import { OBJExporter } from "three/addons/exporters/OBJExporter.js";

interface ExportOptions {
  format: "glb" | "gltf" | "stl" | "obj" | "nc" | "gcode";
  fileName?: string;
  geometry: THREE.BufferGeometry;
}

export const exportModel = ({
  format,
  fileName = "model",
  geometry,
}: ExportOptions) => {
  if (!geometry) {
    console.error("No geometry available for export");
    return;
  }

  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());

  switch (format) {
    case "glb":
    case "gltf":
      const gltfExporter = new GLTFExporter();
      gltfExporter.parse(
        mesh,
        (result) => {
          const output = JSON.stringify(result);
          downloadFile(
            output,
            `${fileName}.${format}`,
            "application/octet-stream"
          );
        },
        { binary: format === "glb" } as any
      );
      break;

    case "stl":
      const stlExporter = new STLExporter();
      const stlData = stlExporter.parse(mesh);
      downloadFile(stlData, `${fileName}.stl`, "application/octet-stream");
      break;

    case "obj":
      const objExporter = new OBJExporter();
      const objData = objExporter.parse(mesh);
      downloadFile(objData, `${fileName}.obj`, "text/plain");
      break;

    case "nc":
    case "gcode":
      const gcodeData = generateGCode(geometry);
      downloadFile(gcodeData, `${fileName}.${format}`, "text/plain");
      break;
  }
};

// 파일 다운로드 헬퍼 함수
const downloadFile = (
  data: string | ArrayBuffer,
  fileName: string,
  mimeType: string
) => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

// G-code 생성 함수 (구현 필요)
const generateGCode = (geometry: THREE.BufferGeometry): string => {
  // G-code 생성 로직
  return "";
};
