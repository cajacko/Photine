import React, { PureComponent } from 'react';
import SlideShow from 'components/SlideShow/SlideShow.container';

/**
 * Main entry point to render the app
 */
class AppRender extends PureComponent {
  /**
   * Render the application
   *
   * @return {Component} The React component to render
   */
  render() {
    return <SlideShow />;
  }
}

export default AppRender;
