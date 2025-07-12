import React, { useState, useRef, useCallback, useEffect } from 'react';
import PhotoCapture from './components/PhotoCapture';
import PhotoAnimator from './components/PhotoAnimator';
import InstallButton from './components/InstallButton';
import './styles/App.css';

interface Photo {
  id: string;
  src: string;
  animation: string;
}

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // 서비스 워커 등록 및 오프라인 상태 관리
  useEffect(() => {
    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // 온라인/오프라인 상태 감지
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handlePhotoCapture = useCallback((photoSrc: string) => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      src: photoSrc,
      animation: 'bounce' // 기본 애니메이션
    };
    setPhotos(prev => [...prev, newPhoto]);
    setCurrentPhoto(newPhoto);
  }, []);

  const handleAnimationChange = useCallback((photoId: string, animation: string) => {
    setPhotos(prev => 
      prev.map(photo => 
        photo.id === photoId 
          ? { ...photo, animation }
          : photo
      )
    );
    
    if (currentPhoto && currentPhoto.id === photoId) {
      setCurrentPhoto(prev => prev ? { ...prev, animation } : null);
    }
  }, [currentPhoto]);

  const handleDeletePhoto = useCallback((photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    if (currentPhoto && currentPhoto.id === photoId) {
      setCurrentPhoto(null);
    }
  }, [currentPhoto]);

  return (
    <div className="app">
      {isOffline && (
        <div className="offline-indicator">
          📶 오프라인 상태입니다
        </div>
      )}
      
      <header className="app-header">
        <h1 className="app-title">📸 사진 애니메이션 놀이터 🎨</h1>
        <p className="app-subtitle">사진을 찍고 신나는 애니메이션을 만들어보세요!</p>
        <InstallButton />
      </header>

      <main className="app-main">
        <div className="app-section">
          <PhotoCapture onPhotoCapture={handlePhotoCapture} />
        </div>

        {currentPhoto && (
          <div className="app-section">
            <PhotoAnimator
              photo={currentPhoto}
              onAnimationChange={handleAnimationChange}
              onDelete={handleDeletePhoto}
            />
          </div>
        )}

        {photos.length > 0 && (
          <div className="app-section">
            <h2 className="section-title">🎭 내 사진들</h2>
            <div className="photos-gallery">
              {photos.map(photo => (
                <div 
                  key={photo.id} 
                  className={`gallery-item ${currentPhoto?.id === photo.id ? 'active' : ''}`}
                  onClick={() => setCurrentPhoto(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt="내 사진" 
                    className={`gallery-photo ${photo.animation}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;