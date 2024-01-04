const initiCanvas = (id)=>{
    return new fabric.Canvas(id,{
        width:600,
        height:1000,
        Selection: false,
    });
}


// Function to handle video input
document.getElementById("videoInput").addEventListener("change", function (e) {
    const videoFile = e.target.files[0];

    if (videoFile) {
        // Create a video element and load the selected video file
        videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(videoFile);

        // Wait for the video to load
        videoElement.addEventListener("loadedmetadata", function () {
            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;

            // Create a Fabric.js video object and add it to the canvas
            const videoObject = new fabric.Image(videoElement, {
                left: 0,
                top: 0,
                width: videoWidth,
                height: videoHeight,
                selectable: false,
            });

            canvas.add(videoObject);
            
            // Start playing the video
            videoElement.play();

            // Call the renderVideo function to continuously update the canvas
            renderVideo();
        });
    }
});

// Function to render the video on the canvas
function renderVideo() {
    if (videoElement && !videoElement.paused && !videoElement.ended) {
        const videoObject = canvas.item(0); // Assuming the video is the first item on the canvas
        if (videoObject) {
            // Clear the canvas and redraw the video frame
            canvas.clear();
            canvas.add(videoObject);

            // Request the next frame
            requestAnimationFrame(renderVideo);
        }
    }
}

const canvas = initiCanvas("initiCanvas");
let videoElement = null;