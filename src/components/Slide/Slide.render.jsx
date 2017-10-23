import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Loading, Image } from 'components/Slide/Slide.style';

/**
 * Render an image as a slide. Making sure the image fills the space it has.
 * Also show a loading view whilst the image is loading.
 *
 * @type {Class}
 */
class SlideRender extends PureComponent {
  /**
   * Render the slide component
   *
   * @return {Component} The React component to render
   */
  render() {
    return (
      <Container innerRef={container => this.props.setContainer(container)}>
        <Loading loading={this.props.loading}>Loading</Loading>

        <Image
          props={this.props.imageProps}
          innerRef={image => this.props.setImage(image)}
          src={this.props.image}
          alt="Slide"
          onLoad={this.props.onload}
        />
      </Container>
    );
  }
}

SlideRender.propTypes = {
  onload: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  setContainer: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  imageProps: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string,
    marginTop: PropTypes.string,
    marginLeft: PropTypes.string,
  }).isRequired,
};

export default SlideRender;
