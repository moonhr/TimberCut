export interface ProcessingOperation {
  id: string;
  name: "Round Edge" | "Circular Hole" | "Groove";
  parameters:
    | {
        topRightRadius: number;
        topLeftRadius: number;
        bottomRightRadius: number;
        bottomLeftRadius: number;
      } // for roundEdge
    | { radius: number; x: number; y: number } // for circularHole
    | { depth: number; width: number; position: number }; // for groove
}
