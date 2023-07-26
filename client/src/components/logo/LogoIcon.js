// material-ui
import Logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIcon from 'assets/images/logo-icon.svg';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = ({ width = '100', ...props }) => {
  return <img src={Logo} alt="icon logo" width={width} {...props} />;
};

LogoIcon.propTypes = {
  width: PropTypes.number,
  props: PropTypes.object
};

export default LogoIcon;
