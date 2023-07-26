import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const InfoItem = ({ href = '/', icon, title }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={6}
      component={Link}
      to={href}
      sx={{
        textDecoration: 'none'
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        component={Paper}
        variant="outlined"
        p={2}
        sx={{
          border: '2px solid',
          borderColor: theme.palette.divider,
          '&:hover': {
            border: '2px solid',
            borderColor: theme.palette.primary.main
          }
        }}
      >
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Stack>
    </Grid>
  );
};

export default InfoItem;
