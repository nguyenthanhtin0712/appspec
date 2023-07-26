import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';

import Logo from 'components/logo';
import { HEADER_HEIGHT } from 'config';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: HEADER_HEIGHT,
        width: 'inherit',
        paddingTop: '8px',
        paddingBottom: '8px'
      }}
    >
      <Logo isIcon={!open} sx={{ width: 120, height: 130, mx: 'auto' }} />
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
