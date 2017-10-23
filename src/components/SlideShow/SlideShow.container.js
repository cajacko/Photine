import { connect } from 'react-redux';
import SlideShow from 'components/SlideShow/SlideShow.component';

/**
 * Map the slides from the state to the component props
 *
 * @param  {Object} slides The state from redux
 * @return {Object}        The props to pass to the component
 */
const mapStateToProps = ({ slides }) => ({ slides });

export default connect(mapStateToProps, undefined)(SlideShow);
