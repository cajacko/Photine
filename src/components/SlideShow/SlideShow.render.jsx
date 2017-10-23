import React, { PureComponent } from 'react';
import Slide from 'components/Slide/Slide.render';

class SlideShowRender extends PureComponent {
  render() {
    return <div>{this.props.slides.map(image => <Slide image={image} />)}</div>;
  }
}

export default SlideShowRender;
