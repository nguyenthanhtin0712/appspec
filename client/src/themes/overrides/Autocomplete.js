export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '7px 9px'
          }
        },
        popupIndicator: {
          width: 'auto',
          height: 'auto'
        },
        popper: {
          boxShadow: theme.customShadows.z3
        },
        clearIndicator: {
          width: 'auto',
          height: 'auto'
        }
      }
    }
  };
}
