/**
 * 새로고침 감지하여 브라우저 기본 경고 활성화
 */
class WarnOnNavigate {
  public enableWarning(): void {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  public disableWarning(): void {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  private handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = "";
  };
}

export default WarnOnNavigate;
