import React, { Component } from "react";
import Cropper from "../libs/react-easy-crop/dist";
import getCroppedImg from "./cropImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

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
      image: null,
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
                minZoom="0.2"
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
              <div
                className="button"
                style={{ background: "#40e22e" }}
                onClick={this.onClickCropImage}
              >
                <p className="btnText">OK</p>
                <div className="btnTwo">
                  <p className="btnText2">
                    <FontAwesomeIcon icon="cut" />
                  </p>
                </div>
              </div>
              <div className="button" onClick={this.onClickCancel}>
                <p className="btnText">CANCEL</p>
                <div className="btnTwo">
                  <p className="btnText2">X</p>
                </div>
              </div>
            </div>
            <div>
              <img width="601.5" height="802" src={this.state.croppedImage} />
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
