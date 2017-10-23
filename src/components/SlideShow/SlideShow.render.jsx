import React, { PureComponent } from 'react';
import Slide from 'components/Slide/Slide.component';
import PropTypes from 'prop-types';

class SlideShow extends PureComponent {
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
