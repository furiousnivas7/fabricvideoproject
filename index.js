var canvas = new fabric.Canvas('c');
var currentVideo = null;
var isPlaying = true; // Declare and initialize isPlaying variable

function addVideo(url) {
    var videoEl = document.createElement('video');
    videoEl.src = url;
    videoEl.crossOrigin = "anonymous";
    videoEl.loop = true;
    videoEl.muted = true;

    videoEl.onloadedmetadata = function () {
        var fabricVideo = new fabric.Image(videoEl, {
            left: 100,
            top: 100,
            angle: 0,
            objectCaching: false,
            scaleX: canvas.width / videoEl.videoWidth, // Scale video to match canvas width
            scaleY: canvas.height / videoEl.videoHeight // Scale video to match canvas height
        });

        canvas.add(fabricVideo);
        currentVideo = fabricVideo;

        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });
    };

    // Append the video element to the document to load video data
    document.body.appendChild(videoEl);
}


document.getElementById('videoUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            addVideo(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

document.getElementById('playPauseButton').addEventListener('click', function() {
    if (currentVideo && currentVideo.getElement()) {
        var videoEl = currentVideo.getElement();
        if (isPlaying) {
            videoEl.pause();
            this.textContent = 'Play';
        } else {
            videoEl.play();
            this.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    }
});

document.getElementById('toggleLoop').addEventListener('click', function() {
    if (currentVideo && currentVideo.getElement()) {
        currentVideo.getElement().loop = !currentVideo.getElement().loop;
    }
});

document.getElementById('toggleMute').addEventListener('click', function() {
    if (currentVideo && currentVideo.getElement()) {
        var videoEl = currentVideo.getElement();
        videoEl.muted = !videoEl.muted;
    }
});
