import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { STLExporter } from "three/addons/exporters/STLExporter.js";
import { OBJExporter } from "three/addons/exporters/OBJExporter.js";
import { FormatType } from "@/ts/types/FormatType";

interface ExportOptions {
  format: FormatType;
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
        (error) => console.error(error),
        { binary: format === "glb" }
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

const generateGCode = (geometry: THREE.BufferGeometry): string => {
  let gcode = "G21 ; Set units to millimeters\n";
  gcode += "G90 ; Absolute positioning\n";
  gcode += "G0 Z5.0 ; Raise to safe height\n";

  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;
  const size = new THREE.Vector3();
  boundingBox?.getSize(size);

  gcode += `; Bounding box size: ${size.x} x ${size.y} x ${size.z}\n`;

  const vertices: Float32Array = geometry.attributes.position
    .array as Float32Array;
  const feedRate = 1500; // mm/min
  const cutDepth = -1.0; // mm

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2] + cutDepth; // Adjust for cutting depth

    if (i === 0) {
      gcode += `G0 X${x.toFixed(2)} Y${y.toFixed(2)} ; Rapid move to start\n`;
      gcode += `G1 Z${z.toFixed(2)} F${feedRate} ; Start cutting\n`;
    } else {
      gcode += `G1 X${x.toFixed(2)} Y${y.toFixed(2)} Z${z.toFixed(
        2
      )} F${feedRate}\n`;
    }
  }

  gcode += "G0 Z5.0 ; Raise to safe height\n";
  gcode += "M30 ; End of program\n";
  return gcode;
};
