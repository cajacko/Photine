import { connect } from 'react-redux';
import FramiumView from 'components/FramiumView/FramiumView.render';

const mapStateToProps = ({ loggedIn }) => ({ loggedIn });

export default connect(mapStateToProps, undefined)(FramiumView);
