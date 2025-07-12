const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // 카메라 모양
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.3;

  // 카메라 바디
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(centerX - radius * 1.2, centerY - radius * 0.8, radius * 2.4, radius * 1.6, radius * 0.2);
  ctx.fill();

  // 카메라 렌즈
  ctx.fillStyle = '#333333';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
  ctx.fill();

  // 렌즈 안쪽
  ctx.fillStyle = '#667eea';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
  ctx.fill();

  // 플래시
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(centerX + radius * 0.7, centerY - radius * 0.5, radius * 0.15, 0, 2 * Math.PI);
  ctx.fill();

  // 파일 저장
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated icon: ${outputPath}`);
}

// 디렉토리 생성
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 아이콘 생성
generateIcon(192, path.join(publicDir, 'icon-192x192.png'));
generateIcon(512, path.join(publicDir, 'icon-512x512.png'));

console.log('All icons generated successfully!');