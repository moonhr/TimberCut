import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

/**
 * ThreeDViewerUI
 * - 3D 모델을 렌더링하고 사용자와의 인터랙션을 처리하는 클래스.
 */
export class ThreeDViewerUI {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor(containerId: string) {
    // Scene 초기화
    this.scene = new THREE.Scene();

    // 카메라 초기화
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(200, 200, 400);

    // 렌더러 초기화
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // DOM 컨테이너에 렌더러 추가
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id '${containerId}' not found.`);
    }
    container.appendChild(this.renderer.domElement);

    // OrbitControls 초기화 (사용자 인터랙션 처리)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 조명 추가
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(500, 500, 500);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    // 창 크기 변경 대응
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  /**
   * 3D Viewer에 모델을 추가하는 메서드
   * @param model - Three.js Mesh 객체
   */
  public addModel(model: THREE.Mesh): void {
    this.scene.add(model);
  }

  /**
   * Viewer 렌더링 시작
   */
  public startRendering(): void {
    const animate = () => {
      requestAnimationFrame(animate);

      // OrbitControls 업데이트
      this.controls.update();

      // Scene 렌더링
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  /**
   * 창 크기 변경 시 카메라와 렌더러를 업데이트
   */
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
