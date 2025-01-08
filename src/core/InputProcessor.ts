/**
 * InputProcessor
 * - 사용자 입력 데이터를 가공하고 3D 모델 생성에 적합한 형식으로 변환하는 클래스
 */
export class InputProcessor {
  // 3D 모델 생성에 사용할 데이터를 저장
  private processedData: {
    dimensions: { length: number; width: number; thickness: number };
    shape: string;
    material: string;
  };

  constructor() {
    this.processedData = {
      dimensions: { length: 0, width: 0, thickness: 0 },
      shape: "",
      material: "",
    };
  }

  /**
   * 사용자 입력 데이터를 가공하는 메서드
   * @param input - UserInputHandler에서 전달받은 사용자 입력 데이터
   */
  public processInput(input: {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  }): void {
    // 데이터를 정리하여 processedData에 저장
    this.processedData = {
      dimensions: {
        length: input.length,
        width: input.width,
        thickness: input.thickness,
      },
      shape: input.shape,
      material: input.material,
    };

    this.applyDefaults(); // 기본값 적용
  }

  /**
   * 가공된 데이터를 반환하는 메서드
   * @returns 3D 모델 생성에 필요한 형식의 데이터
   */
  public getProcessedData(): {
    dimensions: { length: number; width: number; thickness: number };
    shape: string;
    material: string;
  } {
    return this.processedData;
  }

  /**
   * 기본값을 설정하는 내부 메서드
   */
  private applyDefaults(): void {
    if (!this.processedData.shape) {
      this.processedData.shape = "rectangle"; // 기본 모양은 사각형
    }
    if (!this.processedData.material) {
      this.processedData.material = "wood"; // 기본 재질은 목재
    }
  }
}
