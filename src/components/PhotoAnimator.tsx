import React from 'react';
import '../styles/PhotoAnimator.css';

interface Photo {
  id: string;
  src: string;
  animation: string;
}

interface PhotoAnimatorProps {
  photo: Photo;
  onAnimationChange: (photoId: string, animation: string) => void;
  onDelete: (photoId: string) => void;
}

const animations = [
  { name: 'bounce', label: '🏀 통통 튀기', emoji: '🏀' },
  { name: 'spin', label: '🌀 빙글빙글', emoji: '🌀' },
  { name: 'shake', label: '🤹 흔들흔들', emoji: '🤹' },
  { name: 'pulse', label: '💓 쿵쿵쿵', emoji: '💓' },
  { name: 'swing', label: '🎪 그네타기', emoji: '🎪' },
  { name: 'flip', label: '🎭 뒤집기', emoji: '🎭' },
  { name: 'dance', label: '💃 춤추기', emoji: '💃' },
  { name: 'rainbow', label: '🌈 무지개', emoji: '🌈' }
];

const PhotoAnimator: React.FC<PhotoAnimatorProps> = ({ 
  photo, 
  onAnimationChange, 
  onDelete 
}) => {
  return (
    <div className="photo-animator">
      <h2 className="animator-title">🎨 애니메이션 선택</h2>
      
      <div className="photo-preview">
        <img 
          src={photo.src} 
          alt="애니메이션 사진" 
          className={`preview-photo ${photo.animation}`}
        />
      </div>

      <div className="animation-controls">
        <div className="animation-grid">
          {animations.map(animation => (
            <button
              key={animation.name}
              className={`animation-btn ${photo.animation === animation.name ? 'active' : ''}`}
              onClick={() => onAnimationChange(photo.id, animation.name)}
            >
              <span className="animation-emoji">{animation.emoji}</span>
              <span className="animation-label">{animation.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="photo-actions">
        <button 
          className="action-btn delete-btn"
          onClick={() => onDelete(photo.id)}
        >
          🗑️ 삭제하기
        </button>
      </div>
    </div>
  );
};

export default PhotoAnimator;