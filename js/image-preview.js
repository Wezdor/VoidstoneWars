"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
var ImagePreview = /** @class */ (function () {
    function ImagePreview() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('image-preview');
        document.body.append(this.overlay);
    }
    ImagePreview.prototype.toggleImage = function (src, alt) {
        if (this.overlay.classList.contains('opening')) {
            this.overlay.classList.remove('opening');
            this.overlay.classList.add('closing');
        }
        else {
            this.overlay.innerHTML = "<img src='" + src + "' alt='" + alt + "'>";
            this.overlay.classList.remove('closing');
            this.overlay.classList.add('opening');
        }
    };
    return ImagePreview;
}());
window.imagePreview = new ImagePreview();
jquery_1.default('img.resizable').on('click', function () {
    var image = this;
    imagePreview.toggleImage(image.src, image.alt);
});
jquery_1.default('.image-preview').on('click', function () {
    imagePreview.toggleImage();
});
