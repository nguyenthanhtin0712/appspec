import React from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CloseCircle } from 'iconsax-react';

const PositionIntership = ({ position }) => {
  return (
    <Grid container direction="row" alignItems="flex-start">
      <Grid item xs={10} display="flex" alignItems="center" columnGap={1}>
        <Tooltip title="Xoá vị trí" placement="top" arrow>
          <IconButton size="small" shape="rounded" color="error">
            <CloseCircle />
          </IconButton>
        </Tooltip>
        <Typography>{position.position_name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField variant="standard" type="number" size="small"></TextField>
      </Grid>
    </Grid>
  );
};

export default PositionIntership;
