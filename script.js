// Get the video, canvas, and buttons
const video = document.getElementById('webcam');
const canvas = document.getElementById('snapshotCanvas');
const context = canvas.getContext('2d');
const snapshotButton = document.getElementById('snapshotButton');
const downloadButton = document.getElementById('downloadButton');

// Function to start webcam stream
function startWebcam() {
    navigator.mediaDevices.getUserMedia({
        video: true // Use default webcam settings
    }).then((stream) => {
        video.srcObject = stream;
        // Set canvas size to match video size
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;  // Set canvas width
            canvas.height = video.videoHeight; // Set canvas height
        });
    }).catch((err) => {
        console.log("Error accessing webcam: " + err);
    });
}

// Start webcam
startWebcam();

// Take a snapshot when the button is clicked
snapshotButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block'; // Show the canvas after taking a snapshot
});

// Download the snapshot when the download button is clicked
downloadButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'snapshot.png';
    link.click();
});
