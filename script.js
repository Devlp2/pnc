const home = document.getElementById('home');
const cameraView = document.getElementById('cameraView');
const preview = document.getElementById('preview');

const takePhotoBtn = document.getElementById('takePhoto');
const captureBtn = document.getElementById('capture');
const retakePhotoBtn = document.getElementById('retakePhoto');
const approvePhotoBtn = document.getElementById('approvePhoto');

const video = document.getElementById('camera');
const photoCanvas = document.getElementById('photoCanvas');
const ctx = photoCanvas.getContext('2d');

let capturedImage;

// ✅ Open Camera in Mobile
takePhotoBtn.addEventListener('click', async () => {
    home.classList.add('hidden');
    cameraView.classList.remove('hidden');

    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 720, height: 1280, facingMode: "user" }
    });
    
    video.srcObject = stream;
});

// ✅ Capture Photo
captureBtn.addEventListener('click', () => {
    photoCanvas.width = video.videoWidth;
    photoCanvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
    
    capturedImage = photoCanvas.toDataURL("image/png");
    
    cameraView.classList.add('hidden');
    preview.classList.remove('hidden');
});

// ✅ Retake Photo
retakePhotoBtn.addEventListener('click', () => {
    preview.classList.add('hidden');
    cameraView.classList.remove('hidden');
});

// ✅ Approve and Go to Preview
approvePhotoBtn.addEventListener('click', () => {
    sessionStorage.setItem('capturedImage', capturedImage);
    window.location.href = 'preview.html';
});


