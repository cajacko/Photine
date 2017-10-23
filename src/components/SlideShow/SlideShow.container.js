import { connect } from 'react-redux';
import SlideShow from 'components/SlideShow/SlideShow.render';

const mapStateToProps = ({ slides }) => ({ slides });

export default connect(mapStateToProps, undefined)(SlideShow);
