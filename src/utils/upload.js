export const UPLOAD_SIZE_LIMIT = 5242880;
export const UPLOAD_SIZE_LIMIT_GIF = 1048576;
export const UPLOAD_SIZE_LIMIT_ERROR = 'File exceed the 1 Mb limit';
export const UPLAOD_ERROR_BASE = 'Error, try uploading file again later';
export const AVATAR_MAX_WIDTH = 300;
export const AVATAR_MAX_HEIGHT = 300;
export const IMAGE_MAX_WIDTH = 3840;
export const IMAGE_MAX_HEIGHT = 2160;

export const getBase64FromFile = file => (
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Error: Can\'t get base 64 from file'));
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  })
);

export const compressImage = (file, maxWidth, maxHeight, type = 'image/jpeg', quality = 1) => (
  new Promise((resolve, reject) => {
    const fileName = file.name;
    if (file.type === 'image/gif') {
      if (file.size > UPLOAD_SIZE_LIMIT_GIF) {
        reject(UPLOAD_SIZE_LIMIT_ERROR);
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
          ctx.canvas.toBlob((blob) => {
            const file = new File([blob], fileName, {
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
