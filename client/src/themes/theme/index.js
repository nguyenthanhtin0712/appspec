// ==============================|| PRESET THEME - THEME1 ||============================== //

const Theme = () => {
  const contrastText = '#fff';

  let primaryColors = ['#D6E4FF', '#D6E4FF', '#ADC8FF', '#84A9FF', '#6690FF', '#3366FF', '#254EDB', '#1939B7', '#102693', '#102693'];
  let secondaryColors = ['#FFF', '#F8F9FA', '#F3F5F7', '#DBE0E5', '#BEC8D0', '#8996A4', '#5B6B79', '#3E4853', '#1D2630', '#131920'];
  let errorColors = ['#f5bebe', '#e76767', '#dc2626', '#d31c1c', '#c50d0d'];
  let warningColors = ['#f7dcb3', '#edad4d', '#e58a00', '#de7700', '#d35a00'];
  let infoColors = ['#DCF0FF', '#7EB9FF', '#549BFF', '#3D78DB', '#1A3D93'];
  let successColors = ['#c0e5d9', '#6bc2a5', '#2ca87f', '#21976c', '#107d4f'];

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText
    },
    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      500: secondaryColors[5],
      main: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      contrastText
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText
    }
  };
};

export default Theme;
