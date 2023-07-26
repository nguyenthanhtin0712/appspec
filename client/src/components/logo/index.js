import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project-imports
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to, width }) => (
  <ButtonBase disableRipple component={Link} to={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    <LogoIcon width={width} />
  </ButtonBase>
);

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  sx: PropTypes.object,
  isIcon: PropTypes.bool,
  to: PropTypes.string,
  width: PropTypes.number
};

export default LogoSection;
