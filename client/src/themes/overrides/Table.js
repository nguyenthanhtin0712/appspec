// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-of-type': {
            '& .MuiTableCell-root': {
              borderBottom: 'none'
            }
          },
          '& .MuiTableCell-root': {
            '&:last-of-type': {
              paddingRight: 24
            },
            '&:first-of-type': {
              paddingLeft: 24
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: 12,
          borderColor: theme.palette.divider
        },
        head: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.neutral,
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase'
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1)
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          fontSize: '0.875rem'
        },
        displayedRows: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.lighter,
          borderTop: '1px solid '.concat(theme.palette.divider),
          borderBottom: '2px solid '.concat(theme.palette.divider)
        }
      }
    }
  };
}
