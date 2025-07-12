import React, { useState, useEffect } from 'react';
import '../styles/InstallButton.css';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // 기본 미니 인포바 방지
      e.preventDefault();
      // 나중에 사용하기 위해 이벤트 저장
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA가 설치되었습니다');
      setIsInstalled(true);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 이미 설치되어 있는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();
    
    // 사용자 선택 기다리기
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('사용자가 설치를 수락했습니다');
    } else {
      console.log('사용자가 설치를 거부했습니다');
    }
    
    // 프롬프트 제거
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (isInstalled) {
    return (
      <div className="install-status">
        <span className="install-success">✅ 앱이 설치되었습니다!</span>
      </div>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <div className="install-container">
      <button 
        className="install-button"
        onClick={handleInstallClick}
        aria-label="앱 설치하기"
      >
        <span className="install-icon">📱</span>
        <span className="install-text">앱 설치하기</span>
      </button>
      <p className="install-description">
        홈 화면에 설치하여 더 편리하게 사용하세요!
      </p>
    </div>
  );
};

export default InstallButton;