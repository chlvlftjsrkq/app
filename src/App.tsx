import React, { useState, useRef, useCallback } from 'react';
import PhotoCapture from './components/PhotoCapture';
import PhotoAnimator from './components/PhotoAnimator';
import './styles/App.css';

interface Photo {
  id: string;
  src: string;
  animation: string;
}

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

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
      <header className="app-header">
        <h1 className="app-title">📸 사진 애니메이션 놀이터 🎨</h1>
        <p className="app-subtitle">사진을 찍고 신나는 애니메이션을 만들어보세요!</p>
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