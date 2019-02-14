import React, { Component } from "react";
import Draggable from "react-draggable";
import FaceTemplate from "../../resources/template1.jpg";
import CustomImage from "../../resources/fabio.jpg";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./styles.css";

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

export default class SetupFace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: CustomImage,
      croppedImage: null,
      croppedAreaPixels: null,
      crop: { x: 0, y: 0 },
      zoom: 2,
      aspect: 3 / 4
    };
  }

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({ croppedAreaPixels });
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  onClickCropImage = async evt => {
    const croppedImage = await getCroppedImg(
      this.state.image,
      this.state.croppedAreaPixels
    );
    console.log(croppedImage);
    this.setState({ croppedImage });
  };
  render() {
    return (
      <React.Fragment>
        <div className="crop-container">
          <Cropper
            image={this.state.image}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </div>
        <div className="controls">
          <button onClick={this.onClickCropImage}>OK!</button>
        </div>
        <div>
          <img src={this.state.croppedImage} />
        </div>
      </React.Fragment>
    );
  }
}
