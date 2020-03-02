import $ from 'jquery';

class ImagePreview {

    private readonly overlay: HTMLElement;

    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('image-preview');
        document.body.append(this.overlay);
    }

    public toggleImage(src?: string, alt?: string) {
        if (this.overlay.classList.contains('opening')) {
            this.overlay.classList.remove('opening');
            this.overlay.classList.add('closing');
        } else {
            this.overlay.innerHTML = `<img src='${src}' alt='${alt}'>`;
            this.overlay.classList.remove('closing');
            this.overlay.classList.add('opening');
        }
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
