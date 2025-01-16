export interface GrooveParameters extends Record<string, number> {
  baseHeight: number;
  grooveDepth: number;
  grooveLength: number;
}

export interface CircularHoleParameters extends Record<string, number> {
  x: number;
  y: number;
  radius: number;
}

export interface RoundEdgeParameters extends Record<string, number> {
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}
