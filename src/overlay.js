document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    // Заменить на событие загрузки AR-библиотеки
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000);
});

document.getElementById('captureBtn').addEventListener('click', () => {
    const screenshotTarget = document.getElementById('user-view');
    if (!screenshotTarget) return;

    html2canvas(screenshotTarget).then((canvas) => {
        const base64image = canvas.toDataURL("image/png"); // Get image data as base64
        const screenshotName = 'screenshot_' + (new Date()).toISOString() + '.png'

        // To save the image, you can trigger a download:
        const a = document.createElement('a');
        a.href = base64image;
        a.download = screenshotName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log('Фото сделано', screenshotName);
    });

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