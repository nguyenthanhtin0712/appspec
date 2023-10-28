import React from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CloseCircle } from 'iconsax-react';
import { dispatch } from 'store';
import { deleteRecruitmentPosition, setPositionQuantity } from 'store/slices/createRegisterInternSlice';

const PositionIntership = ({ position }) => {
  const handleChange = (e) => {
    dispatch(setPositionQuantity({ position, quantity: e.target.value }));
  };

  const handleDelete = () => {
    dispatch(deleteRecruitmentPosition(position));
  };

  return (
    <Grid container direction="row" alignItems="flex-start" mb={1.5}>
      <Grid item xs={10} display="flex" alignItems="center" columnGap={1}>
        <Tooltip title="Xoá vị trí" placement="top" arrow>
          <IconButton size="small" shape="rounded" color="error" onClick={handleDelete}>
            <CloseCircle />
          </IconButton>
        </Tooltip>
        <Typography>{position.position_name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          value={position.position_quantity === 0 ? '' : position.position_quantity}
          onChange={(e) => handleChange(e)}
          variant="standard"
          type="number"
          size="small"
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default PositionIntership;
