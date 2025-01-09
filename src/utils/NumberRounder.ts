/**
 * NumberRounder 클래스
 * - 숫자를 소수점 세 번째 자리에서 반올림
 */
export class NumberRounder {
  /**
   * 주어진 숫자를 소수점 2번째 자리에서 반올림
   * @param value - 입력된 숫자
   * @returns 소수점 2번째 자리에서 반올림된 숫자
   */
  static roundToThreeDecimalPlaces(value: number): number {
    return parseFloat(value.toFixed(2));
    // .toFixed(2): 소수점 2번째 자리까지 반올림한 문자열 반환
    // parseFloat: 문자열을 숫자로 변환
  }
}
