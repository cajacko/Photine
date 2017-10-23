import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SlideRender extends PureComponent {
  render() {
    return (
      <div>
        <img src={this.props.image} alt="Slide" />
      </div>
    );
  }
}

SlideRender.propTypes = {
  image: PropTypes.string.isRequired,
};

export default SlideRender;
