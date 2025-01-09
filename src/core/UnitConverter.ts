/**
 * UnitConverter 클래스
 * - mm, inch, cm, ft 단위 간 상호 변환
 */
export class UnitConverter {
  static convertMmToInch(mm: number): number {
    return mm / 25.4;
  }

  static convertInchToMm(inch: number): number {
    return inch * 25.4;
  }

  static convertMmToCm(mm: number): number {
    return mm / 10;
  }

  static convertCmToMm(cm: number): number {
    return cm * 10;
  }

  static convertMmToFt(mm: number): number {
    return mm / 304.8;
  }

  static convertFtToMm(ft: number): number {
    return ft * 304.8;
  }

  static convertToMm(value: number, unit: "mm" | "cm" | "inch" | "ft"): number {
    switch (unit) {
      case "mm":
        return value;
      case "cm":
        return this.convertCmToMm(value);
      case "inch":
        return this.convertInchToMm(value);
      case "ft":
        return this.convertFtToMm(value);
      default:
        throw new Error("Unsupported unit");
    }
  }
}
