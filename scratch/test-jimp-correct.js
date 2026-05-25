const { Jimp } = require('jimp');

Jimp.read('public/icon-layanan.png')
  .then(image => {
    console.log('Image dimensions:', image.bitmap.width, 'x', image.bitmap.height);
  })
  .catch(err => {
    console.error(err);
  });
