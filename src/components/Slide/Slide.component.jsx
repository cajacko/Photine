import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SlideRender from 'components/Slide/Slide.render';

class Slide extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      imageProps: {
        height: null,
        width: null,
        marginTop: null,
        marginLeft: null,
      },
    };

    this.onload = this.onload.bind(this);
    this.getImagePosition = this.getImagePosition.bind(this);
    this.setContainer = this.setContainer.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  onload() {
    const style = this.getImagePosition();

    style.loading = false;

    this.setState(style);
  }

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

  setContainer(container) {
    this.container = container;
  }

  setImage(image) {
    this.image = image;
  }

  render() {
    return (
      <SlideRender
        image={this.props.image}
        setContainer={this.setContainer}
        setImage={this.setImage}
        loading={this.state.loading}
        imageProps={this.state.imageProps}
        onload={this.onload}
      />
    );
  }
}

Slide.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Slide;
