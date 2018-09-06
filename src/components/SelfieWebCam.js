/*
 * @flow
 */

/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';

import styled, { css } from 'styled-components';
import { faSyncAlt } from '@fortawesome/pro-regular-svg-icons';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 * constants
 */

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
export const DATA_URL_PREFIX :string = 'data:image/png;base64,';

/*
 * styled components
 */

const OuterWrapper = styled.div`
  display: block;
  position: relative;
`;

const InnerWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const ControlsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 30px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const CaptureIcon = styled.div`
  align-items: center;
  border-radius: 56px;
  color: #fff;
  display: flex;
  font-size: 20px;
  height: 56px;
  justify-content: center;
  width: 56px;
  ${(props) => {
    if (props.isActive) {
      return css`
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.6);
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
          cursor: pointer;
        }
      `;
    }
    return css`
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
  }}
`;

const ResetIcon = styled.div`
  align-items: center;
  border-radius: 44px;
  color: #fff;
  display: flex;
  font-size: 14px;
  height: 44px;
  justify-content: center;
  left: 50px;
  position: absolute;
  width: 45px;
  ${(props) => {
    if (props.isActive) {
      return css`
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.6);
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
          cursor: pointer;
        }
      `;
    }
    return css`
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
  }}
`;

const StyledVideoElement = styled.video`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

const StyledImageElement = styled.img`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

/*
 * types
 */

type Props = {
  onSelfieCapture :(selfieDataAsBase64 :?string) => void;
};

type State = {
  hasMedia :boolean;
  selfieSource :?string;
  videoSource :?URL;
};

class SelfieWebCam extends React.Component<Props, State> {

  canvas :?HTMLCanvasElement;
  canvasCtx :?CanvasRenderingContext2D;
  mediaStream :?MediaStream;
  video :?HTMLVideoElement;

  static defaultProps = {
    onSelfieCapture: () => {}
  }

  constructor(props :Props) {

    super(props);

    this.state = {
      hasMedia: false,
      selfieSource: null,
      videoSource: null
    };
  }

  componentDidMount() {

    const mediaSupport :boolean = !!(
      navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia
    );

    if (!mediaSupport) {
      // TODO: browser doesn't support navigator.getUserMedia interface
      return;
    }

    if (!this.state.hasMedia) {
      this.requestUserMedia();
    }
  }

  componentWillUnmount() {
    this.closeMediaStream();
  }

  requestUserMedia = () => {

    navigator.getUserMedia = (
      navigator.getUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia
      || navigator.webkitGetUserMedia
    );

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: false,
          video: true
        },
        (stream) => {
          this.handleUserMedia(null, stream);
        },
        (error) => {
          this.handleUserMedia(error);
        }
      );
    }
  }

  handleUserMedia = (error :?any, stream :?MediaStream) => {

    if (error) {
      this.setState({ hasMedia: false });
      return;
    }

    this.mediaStream = stream;

    this.setState({
      hasMedia: true,
      selfieSource: null,
      videoSource: window.URL.createObjectURL(stream)
    });
  }

  closeMediaStream = () => {

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track :MediaStreamTrack) => {
        track.stop();
      });
      if (this.video) {
        this.video.srcObject = null;
      }
    }
  }

  handleOnClickCapture = () => {

    const video :?HTMLVideoElement = this.video;

    if (!this.state.hasMedia || !video || this.state.selfieSource) {
      return;
    }

    if (!this.canvas || !this.canvasCtx) {
      const newCanvas :HTMLCanvasElement = document.createElement('canvas');
      const aspectRatio :number = video.videoWidth / video.videoHeight;
      newCanvas.width = video.clientWidth;
      newCanvas.height = video.clientWidth / aspectRatio;
      this.canvas = newCanvas;
      this.canvasCtx = newCanvas.getContext('2d');
    }

    const canvas :?HTMLCanvasElement = this.canvas;
    const canvasCtx :?CanvasRenderingContext2D = this.canvasCtx;

    if (canvas && canvasCtx) {
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const selfieSource :string = canvas.toDataURL();
      this.setState({ selfieSource });

      // TODO: there's probably a better way of stripping the beginning of the data url
      this.props.onSelfieCapture(selfieSource.slice(DATA_URL_PREFIX.length));
    }
  }

  handleOnClickReset = () => {

    this.setState({
      selfieSource: null
    });
  }

  render() {

    if (!this.state.hasMedia) {
      return null;
    }

    const selfieCaptured :boolean = !!this.state.selfieSource;

    return (
      <OuterWrapper>
        <InnerWrapper>
          <StyledVideoElement
              autoPlay
              muted
              height={450}
              width={600}
              isVisible={!selfieCaptured}
              src={this.state.videoSource}
              innerRef={(element) => {
                this.video = element;
              }} />
          <StyledImageElement
              alt="selfie"
              isVisible={selfieCaptured}
              src={this.state.selfieSource} />
          <ControlsWrapper>
            <ResetIcon isActive={selfieCaptured} onClick={this.handleOnClickReset}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </ResetIcon>
            <CaptureIcon isActive={!selfieCaptured} onClick={this.handleOnClickCapture}>
              <FontAwesomeIcon icon={faCamera} />
            </CaptureIcon>
          </ControlsWrapper>
        </InnerWrapper>
      </OuterWrapper>
    );
  }
}

export default SelfieWebCam;
