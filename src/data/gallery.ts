export const GALLERY_IMAGES = Array.from({ length: 14 }, (_, index) => ({
  src: `/gallery/${index + 1}.jpg`,
  alt: `Dokumentasi BinaHub ${index + 1}`,
}));
