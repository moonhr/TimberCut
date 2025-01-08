yaho

UserInputHandle - 사용자 입력을 받아 유효성을 검증. IntergrationManager가 호출해 입력 데이터를 관리.
InputProcessor - 검증된 데이터를 가져와 3D 도레 생성에 필요한 형식으로 변환.
ThreeDModelGenerator - 처리된 데이터 기반으로 3D 모델을 생성. IntegrationManager에서 생성된 모델을 추가/업데이트.
ThreeDViewerUI - Three.js초기화하고 사용자 인터렉션을 처리.
IntegrationManager - 사용자 입력과 3D view를 통합 관리.
