import { typographyClasses } from '@mui/material/Typography';
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// ----------------------------------------------------------------------

export default function Accordion(theme) {
  return {
    MuiAccordion: {
      defaultProps: {
        disableGutters: !0,
        square: !0,
        elevation: 0
      },
      styleOverrides: {
        root: {
          border: '1px solid '.concat(theme.palette.divider),
          '&:not(:last-child)': {
            borderBottom: 0
          },
          '&:before': {
            display: 'none'
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.secondary.lighter
          }
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          borderTop: '1px solid '.concat(theme.palette.secondary.light)
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          [`&.${accordionSummaryClasses.disabled}`]: {
            opacity: 1,
            color: theme.palette.action.disabled,
            [`& .${typographyClasses.root}`]: {
              color: 'inherit'
            }
          }
        },
        expandIconWrapper: {
          color: 'inherit'
        }
      }
    }
  };
}
