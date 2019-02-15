const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  // ctx.drawImage(
  //   image,
  //   pixelCrop.x,
  //   pixelCrop.y,
  //   pixelCrop.width,
  //   pixelCrop.height,
  //   0,
  //   0,
  //   pixelCrop.width,
  //   pixelCrop.height
  // );

  ctx.save();
  ctx.beginPath();
  // ctx.moveTo(pixelCrop.width / 2, 0);
  // ctx.quadraticCurveTo(0, 0, 0, pixelCrop.height / 2);
  // ctx.lineWidth = 10;
  // ctx.moveTo(0, pixelCrop.height/2);
  // ctx.quadraticCurveTo(0, 0, 0, pixelCrop.height / 2);

  ctx.moveTo(pixelCrop.width / 2, 0);
  ctx.ellipse(
    pixelCrop.width / 2,
    pixelCrop.height / 2,
    pixelCrop.width / 2,
    pixelCrop.height / 2,
    0,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, pixelCrop.width, pixelCrop.height);

  ctx.clip();

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}
