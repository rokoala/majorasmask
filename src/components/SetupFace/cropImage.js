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

  ctx.save();
  ctx.beginPath();
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

  ctx.globalAlpha = 0;
  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(0, 0, pixelCrop.width, pixelCrop.height);
  ctx.clearRect(0, 0, pixelCrop.width, pixelCrop.height);

  ctx.clip();

  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
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

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file));
    }, "image/png");
  });
}
