import React, { PureComponent } from 'react';
import Slide from 'components/Slide/Slide.component';
import PropTypes from 'prop-types';

/**
 * The markup for the slideshow
 *
 * @type {Class}
 */
class SlideShow extends PureComponent {
  /**
   * Render the slideshow component
   *
   * @return {Component} React component to display
   */
  render() {
    if (!this.props.slide) {
      return null;
    }

    return <Slide image={this.props.slide} />;
  }
}

SlideShow.propTypes = {
  slide: PropTypes.string,
};

SlideShow.defaultProps = {
  slide: null,
};

export default SlideShow;
