const finalPhotoCanvas = document.getElementById('finalPhoto');
const finalCtx = finalPhotoCanvas.getContext('2d');
const savePhotoBtn = document.getElementById('savePhoto');

const capturedImage = sessionStorage.getItem('capturedImage');

if (capturedImage) {
    const img = new Image();
    img.src = capturedImage;
    img.onload = () => {
        finalPhotoCanvas.width = img.width;
        finalPhotoCanvas.height = img.height;
        finalCtx.drawImage(img, 0, 0, img.width, img.height);
    };
}

// ✅ Save Photo to Phone & Firebase
savePhotoBtn.addEventListener('click', () => {
    const finalImage = finalPhotoCanvas.toDataURL("image/png");

    // Save to Phone
    const link = document.createElement('a');
    link.href = finalImage;
    link.download = 'photo.png';
    link.click();

    // Save to Firebase
    fetch('save.php', { 
        method: 'POST',
        body: JSON.stringify({ image: finalImage })
    });

    // Show Thank You Dialog
    setTimeout(() => window.location.href = 'dialogue.html', 500);
});


