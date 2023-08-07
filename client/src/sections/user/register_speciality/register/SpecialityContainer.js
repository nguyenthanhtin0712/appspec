import React from 'react';
import Grid from '@mui/material/Grid';
import SpecialityItem from './SpecialityItem';
import { useSelector } from 'react-redux';

const SpecialityContainer = () => {
  const statistic = useSelector((state) => state.register_specialty_user.statistic);
  return (
    <Grid container spacing={2}>
      {statistic.map(({ specialty_id, specialty_name, specialty_quantity, specialty_registered }) => (
        <SpecialityItem
          key={specialty_id}
          name={specialty_name}
          total={specialty_quantity}
          registered_quantity={specialty_registered}
        ></SpecialityItem>
      ))}
    </Grid>
  );
};

export default SpecialityContainer;
