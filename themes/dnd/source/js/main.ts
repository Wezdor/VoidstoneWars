import $ from 'jquery';
import './world-map';

class ImagePreview {

    private readonly overlay: HTMLElement;

    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('image-preview');
        this.overlay.setAttribute('image-preview', '');
        document.body.append(this.overlay);
    }

    public toggleImage(src?: string, alt?: string) {
        if (this.overlay.classList.contains('opened')) {
            this.closeImage();
        } else {
            this.overlay.innerHTML = `<img src='${src}' alt='${alt}' image-preview>`;
            this.overlay.classList.add('opened');
        }
    }

    public closeImage() {
        this.overlay.classList.remove('opened');
    }

}


declare const imagePreview: ImagePreview;
(window as any).imagePreview = new ImagePreview();

$('.img-center.resizable').on('click', function () {
    const image = this as HTMLImageElement;
    imagePreview.toggleImage(image.src, image.alt);
});
$('.image-preview').on('click', function () {
    imagePreview.toggleImage();
});
