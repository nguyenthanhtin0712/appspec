import React from 'react';
import Grid from '@mui/material/Grid';
import SpecialityItem from './SpecialityItem';
import { useSelector } from 'react-redux';
import SpecialityItemSkeleton from 'sections/user/register_speciality/register/SpecialityItemSkeleton';

const SpecialityContainer = () => {
  const { statistic, isLoading } = useSelector((state) => state.register_specialty_user);

  if (isLoading) {
    const numSkeletons = 4;
    const skeletonItems = Array.from({ length: numSkeletons }, (_, index) => <SpecialityItemSkeleton key={index} />);

    return (
      <Grid container spacing={2}>
        {skeletonItems}
      </Grid>
    );
  }

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
