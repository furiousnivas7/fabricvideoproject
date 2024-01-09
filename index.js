document.addEventListener('DOMContentLoaded', function () {
    const canvas = new fabric.Canvas('canvas', {
        width: 800,
        height: 450
    });

    document.getElementById('videoInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.crossOrigin = 'anonymous';
        videoElement.loop = true;
        videoElement.muted = true; 

        videoElement.addEventListener('error', function(e) {
            console.error('Video loading error:', e);
        });

        videoElement.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded. Width:', videoElement.videoWidth, 'Height:', videoElement.videoHeight);

            const fabricVideo = new fabric.Image(videoElement, {
                scaleX: canvas.width / videoElement.videoWidth,
                scaleY: canvas.height / videoElement.videoHeight,
            });

            canvas.add(fabricVideo);
            videoElement.play();

            const render = () => {
                canvas.renderAll();
                fabric.util.requestAnimFrame(render);
            };
            fabric.util.requestAnimFrame(render);
        });
    });
});
