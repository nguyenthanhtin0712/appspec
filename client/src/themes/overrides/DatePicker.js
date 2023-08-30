import { buttonClasses } from '@mui/material/Button';

export default function DatePicker(theme) {
  return {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-actionBar': {
            [`& .${buttonClasses.root}:last-of-type`]: {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[800]
            }
          }
        }
      }
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z3
        }
      }
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: {
          '& .MuiMenuItem-root': {
            borderRadius: 8
          }
        }
      }
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        timeDigitsContainer: {
          alignItems: 'center'
        }
      }
    }
  };
}
