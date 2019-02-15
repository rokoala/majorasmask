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

const ButtonStyle = {
  fontSize: 25,
  width: 90,
  height: 60,
  margin: 5,
  backgroundColor: "green",
  color: "white",
  border: "1px solid rgba(0,0,0,0.09)",
  borderRadius: "5px"
};

const CancelButtonStyle = {
  fontSize: 25,
  height: 60,
  margin: 5,
  backgroundColor: "red",
  color: "white",
  border: "1px solid rgba(0,0,0,0.09)",
  borderRadius: "5px"
};

export default class SetupFace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: CustomImage,
      croppedImage: null,
      croppedAreaPixels: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
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
    this.setState({ croppedImage });
  };

  onClickCancel = () => {
    this.setState({
      image: null
    });
  };

  onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const imageDataUrl = await readFile(e.target.files[0]);
      this.setState({
        image: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.image ? (
          <React.Fragment>
            <div className="crop-container">
              <Cropper
                image={this.state.image}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                cropShape="round"
                showGrid={false}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <div className="controls">
              <button style={ButtonStyle} onClick={this.onClickCropImage}>
                ok
              </button>
              <button style={CancelButtonStyle} onClick={this.onClickCancel}>
                cancelar
              </button>
            </div>
            <div>
              <img src={this.state.croppedImage} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>Upload your photo</div>
            <input type="file" onChange={this.onFileChange} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
