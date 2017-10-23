import React, { PureComponent } from 'react';
import Slide from 'components/Slide/Slide.render';
import PropTypes from 'prop-types';

class SlideShowRender extends PureComponent {
  constructor(props) {
    super(props);

    const slideIterator = 0;
    const slide = props.slides[slideIterator] || null;

    this.state = { slideIterator, slide };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let slideIterator = this.state.slideIterator + 1;
      let slide = this.props.slides[slideIterator];

      if (!slide) {
        slideIterator = 0;
        slide = this.props.slides[slideIterator];
      }

      if (!slide) {
        slide = null;
      }

      this.setState({ slideIterator, slide });
    }, 5000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    if (!this.state.slide) {
      return null;
    }

    return <Slide image={this.state.slide} />;
  }
}

SlideShowRender.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlideShowRender;
