import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Loading, Image } from 'components/Slide/Slide.style';

class SlideRender extends PureComponent {
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

  onload() {
    const style = this.getImagePosition();

    style.loading = false;

    this.setState(style);
  }

  render() {
    return (
      <Container
        innerRef={(container) => {
          this.container = container;
        }}
      >
        <Loading loading={this.state.loading}>Loading</Loading>

        <Image
          props={this.state.imageProps}
          innerRef={(image) => {
            this.image = image;
          }}
          src={this.props.image}
          alt="Slide"
          onLoad={this.onload}
        />
      </Container>
    );
  }
}

SlideRender.propTypes = {
  image: PropTypes.string.isRequired,
};

export default SlideRender;
