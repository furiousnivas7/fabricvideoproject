var canvas = new fabric.Canvas('c');
var currentVideo = null;
var isPlaying = true;
var isVideoLoaded = false;

function addVideo(url) {
    var videoEl = document.createElement('video');
    videoEl.src = url;
    videoEl.crossOrigin = "anonymous";
    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.width = canvas.width; // Set to match canvas width
    videoEl.height = canvas.height; // Set to match canvas height

    videoEl.onloadeddata = function() {
        console.log("Video data loaded");
        videoEl.play(); // Play the video after data is loaded

        var fabricVideo = new fabric.Image(videoEl, {
            left: 100,
            top: 100,
            angle: 0,
            objectCaching: false,
            canvas: canvas
        });

        canvas.add(fabricVideo);
        currentVideo = fabricVideo;

        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });

        document.getElementById('playPauseButton').disabled = false;
        document.getElementById('toggleLoop').disabled = false;
        document.getElementById('toggleMute').disabled = false;
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


// Function to add text to the canvas
// function addText() {
//     var text = new fabric.Textbox('Your Text Here', {
//         left: 200,
//         top: 200,
//         fill: '#000', // Text color
//         fontSize: 24, // Font size
//         fontFamily: 'Arial', // Font family
//     });
//     console.log("text")

//     canvas.add(text);
// }