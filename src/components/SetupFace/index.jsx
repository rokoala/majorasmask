import React, { Component } from "react";
import Draggable from "react-draggable";
import FaceTemplate from "../../resources/template1.jpg";
import CustomImage from "../../resources/fabio.jpg";

const FaceTemplateStyle = {
  width: "500px",
  height: "600px",
  border: "1px solid black",
  opacity: "0.5",
  MozUserSelect: "none",
  MozUserDrag: "none",
  WebkitUserSelect: "none",
  WebkitUserDrag: "none",
  userSelect: "none",
  userDrag: "none"
};

const CustomImageStyle = {
  opacity: "0.5",
  MozUserSelect: "none",
  MozUserDrag: "none",
  WebkitUserSelect: "none",
  WebkitUserDrag: "none",
  userSelect: "none",
  userDrag: "none"
};

function getCroppedImg(imagePath, pixelCrop) {
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imagePath;
    image.onload = function() {
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

      canvas.toBlob(function(blob) {
        resolve(blob);
      }, "image/png");
      // As Base64 string
      // const dataURL = canvas.toDataURL("image/jpeg");
    };
  });
}

export default class SetupFace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobCroppedImage: null
    };
  }
  cropImage() {
    getCroppedImg(FaceTemplate, { x: 0, y: 0, width: 500, height: 500 }).then(
      imgBase64 => {
        this.setState({
          blobCroppedImage: URL.createObjectURL(imgBase64)
        });
      }
    );
  }
  render() {
    return (
      <div>
        <img src={FaceTemplate} alt="FaceTemplate" style={FaceTemplateStyle} />
        {this.state.blobCroppedImage && (
          <img src={this.state.blobCroppedImage} alt="cropped" />
        )}
        <Draggable>
          <img src={CustomImage} alt="CustomImage" style={CustomImageStyle} />
        </Draggable>
        <button
          onClick={evt => {
            this.cropImage();
          }}
        >
          ok
        </button>
      </div>
    );
  }
}
