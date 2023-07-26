import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledFeatureItem = styled(Grid)(({ theme }) => ({
  paddingLeft: 0,
  paddingTop: 0,
  textDecoration: 'none',
  '& .MuiPaper-root': {
    boxShadow: theme.customShadows.z2,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(6)
  },

  '& svg': {
    color: theme.palette.primary.main,
    width: '50px',
    height: '50px'
  },

  '& .MuiTypography-root': {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    position: 'relative',
    letterSpacing: '0.5px',

    '&:after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      bottom: '-10px',
      transform: 'translateX(-50%)',
      width: 70,
      height: '2px',
      backgroundColor: theme.palette.primary.main
    }
  },
  '&:hover': {
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      transition: 'color 0.5s ease'
    }
  }
}));

const FeatureItem = ({ name, href, icon }) => {
  return (
    <StyledFeatureItem item xs={4} component={Link} to={href}>
      <Stack direction="column" spacing={2} alignItems="center" component={Paper} variant="outlined">
        {icon}
        <Typography>{name}</Typography>
      </Stack>
    </StyledFeatureItem>
  );
};

export default FeatureItem;
