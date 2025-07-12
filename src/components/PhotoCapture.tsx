import React, { useRef, useState, useCallback } from 'react';
import '../styles/PhotoCapture.css';

interface PhotoCaptureProps {
  onPhotoCapture: (photoSrc: string) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCamera, setIsCamera] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setStream(mediaStream);
      setIsCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라에 접근할 수 없습니다. 파일 업로드를 사용해주세요.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCamera(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const photoSrc = canvas.toDataURL('image/jpeg');
        onPhotoCapture(photoSrc);
        stopCamera();
      }
    }
  }, [onPhotoCapture, stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoSrc = e.target?.result as string;
        onPhotoCapture(photoSrc);
      };
      reader.readAsDataURL(file);
    }
  }, [onPhotoCapture]);

  return (
    <div className="photo-capture">
      <h2 className="capture-title">📷 사진 찍기</h2>
      
      <div className="capture-controls">
        <button 
          className="capture-btn camera-btn" 
          onClick={isCamera ? stopCamera : startCamera}
        >
          {isCamera ? '📷 카메라 끄기' : '📷 카메라 켜기'}
        </button>
        
        <button 
          className="capture-btn upload-btn" 
          onClick={() => fileInputRef.current?.click()}
        >
          📁 파일 선택
        </button>
      </div>

      {isCamera && (
        <div className="camera-container">
          <video 
            ref={videoRef} 
            className="camera-video" 
            autoPlay 
            playsInline 
            muted
          />
          <button className="capture-btn take-photo-btn" onClick={capturePhoto}>
            📸 사진 찍기
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default PhotoCapture;