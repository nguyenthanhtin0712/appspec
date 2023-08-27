export default function Dialog(theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ ownerState }) => ({
          boxShadow: theme.customShadows.dialog,
          ...(!ownerState.fullScreen && {
            margin: theme.spacing(2)
          }),
          '& > form': {
            display: 'contents'
          }
        }),
        paperFullScreen: {
          borderRadius: 0
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          fontSize: '1.2rem',
          fontWeight: 600
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 3)
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(3)
        }
      }
    },
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.5)
          }
        }
      }
    }
  };
}
