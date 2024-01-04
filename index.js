const initiCanvas = (id)=>{
    return new fabric.Canvas(id,{
        width:720,
        height:540,
        Selection: false,
    });
}

// Function to handle video input
document.getElementById("videoInput").addEventListener("change", function (e) {
    const videoFile = e.target.files[0];

    if (videoFile) {
        // Create a video element and load the selected video file
        const videoElement = document.createElement("video");
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
        });

        // Start playing the video
        videoElement.play();
    }
});
const canvas = initiCanvas("canvas");