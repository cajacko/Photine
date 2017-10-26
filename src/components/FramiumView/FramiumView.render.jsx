import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SlideShow from 'components/SlideShow/SlideShow.container';
import FourOhFourView from 'components/FourOhFourView/FourOhFourView.render';

class FramiumViewRender extends PureComponent {
  render() {
    return this.props.loggedIn ? <SlideShow /> : <FourOhFourView />;
  }
}

FramiumViewRender.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default FramiumViewRender;
