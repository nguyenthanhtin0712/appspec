import Box from '@mui/material/Box';
import LogoIcon from 'components/logo/LogoIcon';

export default function LoadingScreen({ sx, ...other }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        ...sx
      }}
      {...other}
    >
      <LogoIcon />
    </Box>
  );
}
