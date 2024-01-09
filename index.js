document.addEventListener('DOMContentLoaded', function () {
    const canvas = new fabric.Canvas('canvas', {
        width: 800,
        height: 450
    });

    document.getElementById('videoInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        fabric.Image.fromURL(url, function (oImg) {
            oImg.set({
                left: 0,
                top: 0,
                angle: 0,
                selectable: false
            });
            oImg.scaleToWidth(canvas.width);
            canvas.add(oImg);
            oImg.getElement().play();
        }, {
            crossOrigin: 'anonymous'
        });
    });
});
