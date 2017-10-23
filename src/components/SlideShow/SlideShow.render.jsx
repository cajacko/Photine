import React, { PureComponent } from 'react';
import Slide from 'components/Slide/Slide.render';

class SlideShowRender extends PureComponent {
  render() {
    return (
      <div>
        <Slide />
        <Slide />
        <Slide />
        <Slide />
      </div>
    );
  }
}

export default SlideShowRender;
