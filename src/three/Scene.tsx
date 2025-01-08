import * as THREE from "three";

class Scene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(container: HTMLElement) {
    this.container = container;

    // Three.js 초기화
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);

    this.animate();
  }

  // 애니메이션 루프
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  // 모델 추가
  public addModel(model: THREE.Mesh): void {
    this.scene.add(model);
  }

  // 기존 모델 제거
  public clearScene(): void {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  // 화면 크기 조정 대응
  public resize(): void {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
}

export default Scene;
