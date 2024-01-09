document.addEventListener('DOMContentLoaded', function () {
    const canvas = new fabric.Canvas('canvas', {
        width: 800,
        height: 450
    });

    document.getElementById('videoInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        // Create a native video element
        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.crossOrigin = 'anonymous';
        videoElement.loop = true;
        videoElement.muted = true; // Add this line if autoplay without interaction is needed

        // When the metadata is loaded, create the Fabric image object
        videoElement.addEventListener('loadedmetadata', function() {
            const fabricVideo = new fabric.Image(videoElement, {
                scaleX: canvas.width / videoElement.videoWidth,
                scaleY: canvas.height / videoElement.videoHeight,
            });

            canvas.add(fabricVideo);
            videoElement.play();

            // Update the canvas at the video frame rate
            const render = () => {
                canvas.renderAll();
                fabric.util.requestAnimFrame(render);
            };
            fabric.util.requestAnimFrame(render);
        });
    });
});
