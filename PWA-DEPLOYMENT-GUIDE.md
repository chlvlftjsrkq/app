# 📱 PWA 배포 가이드

## 🎯 배포 파일

- **`kids-photo-animator-pwa.zip`** - 완전한 PWA 배포 패키지
- **`dist/`** 폴더 - 빌드된 모든 파일들

## 📦 포함된 파일들

### 핵심 앱 파일
- `index.html` - 메인 HTML 파일
- `bundle.js` - 번들된 JavaScript 코드
- `bundle.js.LICENSE.txt` - 라이선스 정보

### PWA 필수 파일
- `manifest.json` - 웹 앱 매니페스트
- `sw.js` - 서비스 워커 (오프라인 기능)
- `icon-192x192.png` - 192x192 앱 아이콘
- `icon-512x512.png` - 512x512 앱 아이콘

## 🚀 배포 방법

### 1. 웹 서버 배포
```bash
# 배포 파일 압축 해제
unzip kids-photo-animator-pwa.zip -d /var/www/html/

# 또는 dist 폴더 내용 복사
cp -r dist/* /var/www/html/
```

### 2. 정적 호스팅 서비스
- **Netlify**: `dist` 폴더를 드래그 앤 드롭
- **Vercel**: `vercel --prod`
- **GitHub Pages**: `dist` 폴더 내용을 `gh-pages` 브랜치에 푸시
- **Firebase Hosting**: `firebase deploy`

### 3. Docker 배포
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

## 🔧 PWA 요구사항

### 필수 조건
- ✅ HTTPS 또는 localhost에서 서비스
- ✅ 웹 앱 매니페스트 포함
- ✅ 서비스 워커 등록
- ✅ 반응형 아이콘 (192x192, 512x512)

### 브라우저 지원
- ✅ Chrome 70+ (데스크톱/모바일)
- ✅ Edge 79+ (Windows/Android)
- ✅ Samsung Internet 8.0+
- ✅ Firefox 85+ (Android)
- ✅ Safari 14.1+ (iOS - 홈 화면에 추가)

## 📱 설치 과정

### 사용자 관점
1. 브라우저에서 앱 접속
2. 헤더의 "📱 앱 설치하기" 버튼 클릭
3. 브라우저 설치 프롬프트에서 "설치" 선택
4. 홈 화면에서 네이티브 앱처럼 실행

### 브라우저별 차이점
- **Chrome/Edge**: 자동 설치 프롬프트 + 메뉴바 아이콘
- **Firefox**: 메뉴에서 "홈 화면에 추가"
- **Safari**: 공유 버튼 > "홈 화면에 추가"

## 🔄 오프라인 기능

### 캐시된 리소스
- 메인 HTML/CSS/JS 파일
- 앱 아이콘
- 웹 앱 매니페스트

### 오프라인에서 가능한 기능
- 기본 UI 표시
- 이전에 찍은 사진 보기 (브라우저 저장소)
- 애니메이션 효과 적용
- 파일 업로드 (온라인 시 동기화)

## 🛠️ 개발 환경에서 테스트

### 로컬 HTTPS 서버
```bash
# 로컬 서버 실행
cd dist
python3 -m http.server 8080

# 브라우저에서 접속
open http://localhost:8080
```

### Chrome DevTools PWA 감사
1. F12 > Application 탭
2. Service Workers 확인
3. Manifest 확인
4. Lighthouse PWA 감사 실행

## 📊 PWA 성능 지표

### Lighthouse PWA 체크리스트
- ✅ 웹 앱 매니페스트 존재
- ✅ 서비스 워커 등록
- ✅ 오프라인 작동
- ✅ 설치 가능
- ✅ HTTPS 제공
- ✅ 반응형 디자인

## 🎉 배포 완료!

PWA가 성공적으로 배포되면 사용자는:
- 🌐 웹 브라우저에서 바로 사용
- 📱 홈 화면에 설치하여 네이티브 앱처럼 사용
- 🔄 오프라인 상태에서도 기본 기능 사용
- ⚡ 빠른 로딩 속도 경험

아이들이 더 편리하고 재미있게 사진 애니메이션을 만들 수 있습니다!