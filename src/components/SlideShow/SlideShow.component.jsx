import React, { PureComponent } from 'react';
import SlideShowRender from 'components/SlideShow/SlideShow.render';
import PropTypes from 'prop-types';

/**
 * Set the slideshow
 *
 * @type {Class}
 */
class SlideShow extends PureComponent {
  /**
   * Initiate the class. Set the initial state;
   *
   * @param  {Object} props The props passed to the component
   * @return {Void}       No return value
   */
  constructor(props) {
    super(props);

    const slideIterator = 0;
    const slide = props.slides[slideIterator] || null;

    this.state = { slideIterator, slide };
  }

  /**
   * Set the slideshow interval and change slide on it
   *
   * @return {Void} No return value
   */
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

  /**
   * Remove the interval on unmount
   *
   * @return {Void} No return value
   */
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * Render the slideshow
   *
   * @return {Component} The react component to render
   */
  render() {
    return <SlideShowRender slide={this.state.slide} />;
  }
}

SlideShow.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlideShow;
