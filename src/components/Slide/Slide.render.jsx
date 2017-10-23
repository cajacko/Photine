import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Loading } from 'components/Slide/Slide.style';

class SlideRender extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: true };

    this.onload = this.onload.bind(this);
  }

  onload(event) {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container>
        <Loading loading={this.state.loading}>Loading</Loading>

        <img
          ref={(image) => {
            this.image = image;
          }}
          src={this.props.image}
          alt="Slide"
          onLoad={this.onload}
        />
      </Container>
    );
  }
}

SlideRender.propTypes = {
  image: PropTypes.string.isRequired,
};

export default SlideRender;
