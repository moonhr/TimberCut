/**
 * UserInputHandler
 * - 사용자 입력을 처리하고 유효성을 검증하는 클래스
 */
export class UserInputHandler {
  // 사용자 입력 데이터를 저장
  private inputData: {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  };

  constructor() {
    this.inputData = {
      length: 0,
      width: 0,
      thickness: 0,
      shape: "",
      material: "",
    };
  }

  /**
   * 사용자 입력을 저장하는 메서드
   * @param data - 입력 값 객체
   */
  public setInput(data: {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  }): void {
    this.validateInput(data); // 유효성 검증
    this.inputData = data;
  }

  /**
   * 사용자 입력 데이터를 반환하는 메서드
   * @returns 사용자 입력 데이터
   */
  public getInput(): {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  } {
    return this.inputData;
  }

  /**
   * 입력 값의 유효성을 검증하는 메서드
   * @param data - 입력 값 객체
   * @throws Error - 유효하지 않은 값일 경우 예외 발생
   */
  private validateInput(data: {
    length: number;
    width: number;
    thickness: number;
    shape: string;
    material: string;
  }): void {
    if (data.length <= 0 || data.width <= 0 || data.thickness <= 0) {
      throw new Error("크기 값은 0보다 커야 합니다.");
    }
    if (!["rectangle", "circle", "custom"].includes(data.shape)) {
      throw new Error("유효하지 않은 모양입니다.");
    }
    if (!data.material) {
      throw new Error("재질 정보를 입력해주세요.");
    }
  }
}
