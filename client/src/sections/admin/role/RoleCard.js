import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';

const RoleCard = ({ func, handleChange, select }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <MainCard title={func.functional_name}>
        <FormGroup>
          {func?.permissions.length > 0 &&
            func?.permissions.map((permission, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox name={permission.name} checked={select[permission.name]} onChange={handleChange} />}
                label={
                  <Typography
                    style={{
                      formControlLabel: { fontSize: '1rem', '& label': { fontSize: '1rem' } }
                    }}
                  >
                    {permission.desc}
                  </Typography>
                }
              />
            ))}
        </FormGroup>
      </MainCard>
    </Grid>
  );
};

export default RoleCard;
