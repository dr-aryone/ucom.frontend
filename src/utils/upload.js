export const UPLOAD_SIZE_LIMIT = 3145728;
export const UPLOAD_SIZE_LIMIT_GIF = 1048576;
export const UPLOAD_SIZE_LIMIT_ERROR = 'File exceed the 3 Mb limit';
export const UPLOAD_SIZE_LIMIT_ERROR_GIF = 'File exceed the 1 Mb limit';
export const UPLAOD_ERROR_BASE = 'Error, try uploading file again later';
export const AVATAR_MAX_WIDTH = 300;
export const AVATAR_MAX_HEIGHT = 300;
export const IMAGE_MAX_WIDTH = 3840;
export const IMAGE_MAX_HEIGHT = 2160;

export const getBase64FromFile = (file) => {
  try {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Error: Can\'t get base 64 from file'));
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    });
  } catch (e) {
    return console.log(e);
  }
};

export const compressImage = (file, maxWidth, maxHeight, type = 'image/jpeg', quality = 1) => (
  new Promise((resolve, reject) => {
    const fileName = file.name;
    if (file.type === 'image/gif') {
      if (file.size > UPLOAD_SIZE_LIMIT_GIF) {
        reject(UPLOAD_SIZE_LIMIT_ERROR_GIF);
      }
      resolve(file);
    }

    getBase64FromFile(file)
      .then((result) => {
        const img = new Image();
        img.src = result;
        img.onload = () => {
          let { width, height } = img;

          if (width > height && width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          const canvasEl = document.createElement('canvas');
          canvasEl.width = width;
          canvasEl.height = height;

          const ctx = canvasEl.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const newFileName = `${fileName.substr(0, fileName.lastIndexOf('.'))}.jpg`;
          ctx.canvas.toBlob((blob) => {
            const file = new File([blob], newFileName, {
              type,
              lastModified: Date.now(),
            });

            if (file.size > UPLOAD_SIZE_LIMIT) {
              reject(UPLOAD_SIZE_LIMIT_ERROR);
            }

            resolve(file);
          }, type, quality);
        };
      })
      .catch((err) => {
        reject(err);
      });
  })
);

export const compressAvatar = file => compressImage(file, AVATAR_MAX_WIDTH, AVATAR_MAX_HEIGHT);
export const compressUploadedImage = file => compressImage(file, IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT);

export const getImageFromPasteEvent = async (event) => {
  const { items } = (event.clipboardData || event.originalEvent.clipboardData);
  let blob = null;

  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') === 0) {
      blob = items[i].getAsFile();
    }
  }

  if (blob) {
    blob = await compressUploadedImage(blob);
  }

  return blob;
};

