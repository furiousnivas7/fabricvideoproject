const initiCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 600,
        height: 400,
        selection: false,
    });
};

const canvas = initiCanvas("initiCanvas");
let videoElement = null;
let videoObject = null;

// Function to handle video input
document.getElementById("videoInput").addEventListener("change", function (e) {
    const videoFile = e.target.files[0];

    if (videoFile) {
        videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(videoFile);
        videoElement.muted = true; // Mute the video
        videoElement.autoplay = true; // Autoplay when loaded
        videoElement.crossOrigin = "anonymous";


        videoElement.addEventListener("loadedmetadata", function () {
            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;

            videoObject = new fabric.Image(videoElement, {
                left: 0,
                top: 0,
                width: videoWidth,
                height: videoHeight,
                selectable: false,
            });

            canvas.add(videoObject);
            videoElement.play();
            renderVideo();
        });

        videoElement.addEventListener("error", function () {
            console.error("Error loading video");
        });
    }
});

function renderVideo() {
    if (videoElement && !videoElement.paused && !videoElement.ended) {
        if (videoObject) {
            videoObject.setElement(videoElement);
        }
        canvas.renderAll();
        requestAnimationFrame(renderVideo);
    }
}