import imagesArr from './gallery-items.js';


/* <li class="gallery__item">
    <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
    >
    <img
    class="gallery__image"
    src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
    data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
    alt="Tulips"
    />
    </a>
</li> */

const gallery = document.querySelector("ul.js-gallery");
const modal = document.querySelector(".js-lightbox");

const getGalleryImages = function (arr, list) {
    let listImg = imagesArr.map((value, index) => {
        let itemRef = document.createElement('li');
        itemRef.classList.add('gallery__item');
        let linkRef = document.createElement('a');
        linkRef.classList.add('gallery__link');
        linkRef.setAttribute('href', value.original);
        let imageRef = document.createElement('img');
        imageRef.classList.add('gallery__image');
        imageRef.setAttribute('src', value.preview);
        imageRef.setAttribute('alt', value.description);
        imageRef.dataset.source = value.original;
        imageRef.dataset.index = index;
        linkRef.appendChild(imageRef);
        itemRef.appendChild(linkRef);

        return itemRef;
    })

    gallery.append(...listImg);
}

const getImagesSource = function (evt) {
    evt.preventDefault();
    if (evt.target === evt.currentTarget) {
        return;
    };
    modalIsOpen();
    getImage(evt.target.dataset.source);
};

const modalIsOpen = function () {
    modal.classList.add('is-open');
};

const modalIsClose = function () {
    modal.classList.remove('is-open');
    getImage();
};

const getImage = function (value) {
    let modalImage = document.querySelector('img.lightbox__image');

    if (modalImage.getAttribute('src') === value || !value) {
        modalImage.setAttribute('src', '');
    } else {
        modalImage.setAttribute('src', value);
    }
};

getGalleryImages(imagesArr, gallery);

gallery.addEventListener('click', getImagesSource);
document.querySelector('button[data-action="close-lightbox"]').addEventListener('click', modalIsClose);
