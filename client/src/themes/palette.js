// material-ui
import { alpha, createTheme } from '@mui/material/styles';

// project-imports
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const paletteColor = ThemeOption('light');

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: paletteColor.secondary[800],
        secondary: paletteColor.secondary.main,
        disabled: paletteColor.secondary[400]
      },
      action: {
        disabled: paletteColor.secondary.light
      },
      divider: alpha(paletteColor.secondary.light, 0.65),
      background: {
        paper: '#fff',
        default: paletteColor.secondary.lighter,
        neutral: '#f4f6f8'
      }
    }
  });
};

export default Palette;
