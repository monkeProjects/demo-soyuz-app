document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');

  // Заменить на событие загрузки AR-библиотеки
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 2000);
});

document.getElementById('captureBtn').addEventListener('click', () => {
  const canvas = document.getElementById('camera-view');
  if (!canvas) return;

  const dataURL = canvas.toDataURL('image/png');
  console.log('Фото сделано', dataURL);

  // Показ уведомления
  const notice = document.getElementById('photoNotice');
  notice.classList.add('show');
  setTimeout(() => {
    notice.classList.remove('show');
  }, 1500);

  // Вспышка камеры
  const flash = document.getElementById('flashOverlay');
  flash.classList.add('show');
  setTimeout(() => {
    flash.classList.remove('show');
  }, 200);
});