import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SlideRender from 'components/Slide/Slide.render';

const defaultState = {
  loading: true,
  error: null,
  imageProps: {
    height: null,
    width: null,
    marginTop: null,
    marginLeft: null,
  },
};

/**
 * Business logic for the slide component. Set the loading status, get the
 * image positions
 *
 * @type {Class}
 */
class Slide extends PureComponent {
  /**
   * Initiate the class. Set the default state and bind the methods.
   *
   * @param  {Object} props The pass props to the component
   * @return {Void}       No return value
   */
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.onload = this.onload.bind(this);
    this.onerror = this.onerror.bind(this);
    this.getImagePosition = this.getImagePosition.bind(this);
    this.setContainer = this.setContainer.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.image !== this.props.image) {
      this.setState(defaultState);
    }
  }

  onerror() {
    this.setState({ error: 'Error', loading: false });
  }

  /**
   * When the image has loaded, get the image position and turn off loading.
   *
   * @return {Void} No return value
   */
  onload() {
    const style = this.getImagePosition();

    style.loading = false;
    style.error = null;

    this.setState(style);
  }

  /**
   * Get the center position for the image
   *
   * @return {Object} The image height, width, top and bottom margin
   */
  getImagePosition() {
    let height = null;
    let width = null;
    let marginTop = null;
    let marginLeft = null;

    if (
      this.image.naturalWidth &&
      this.image.naturalHeight &&
      this.container.clientHeight &&
      this.container.clientWidth
    ) {
      const imageRatio = this.image.naturalWidth / this.image.naturalHeight;

      if (imageRatio > 1) {
        height = this.container.clientHeight;
        width = height * imageRatio;
      } else {
        width = this.container.clientWidth;
        height = width / imageRatio;
      }

      height = Math.round(height);
      width = Math.round(width);

      if (imageRatio > 1) {
        marginTop = 0;
        marginLeft = -((width - this.container.clientWidth) / 2);
      } else {
        marginTop = -((height - this.container.clientHeight) / 2);
        marginLeft = 0;
      }

      marginLeft = `${marginLeft}px`;
      marginTop = `${marginTop}px`;
      height = `${height}px`;
      width = `${width}px`;
    }

    return { imageProps: { height, width, marginTop, marginLeft } };
  }

  /**
   * Bind the container component, so we can get its height and width later
   *
   * @param {Object} container The container reference
   * @return {Void}            No return value
   */
  setContainer(container) {
    this.container = container;
  }

  /**
   * Bind the image component, so we can get its height and width later
   *
   * @param {Object} image The image reference
   * @return {Void}        No return value
   */
  setImage(image) {
    this.image = image;
  }

  /**
   * Render the slide
   *
   * @return {Component} The react component to render
   */
  render() {
    return (
      <SlideRender
        image={this.props.image}
        setContainer={this.setContainer}
        setImage={this.setImage}
        loading={this.state.loading}
        error={this.state.error}
        imageProps={this.state.imageProps}
        onload={this.onload}
        onerror={this.onerror}
      />
    );
  }
}

Slide.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Slide;
