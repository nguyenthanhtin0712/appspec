import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import SpecialityItemSkeleton from 'sections/user/register_speciality/register/SpecialityItemSkeleton';
import { dispatch } from 'store';
import { getStatisticId } from 'store/slices/registerSpecialtyUserSlice';
import SpecialityItem from 'sections/user/register_speciality/register/SpecialityItem';

const SpecialityContainer = () => {
  const { statistic, majorId, registerSpecialtyId } = useSelector((state) => state.register_specialty_user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStatisticId({ id: registerSpecialtyId, major_id: majorId }));
    };
    fetchData();
  }, [registerSpecialtyId, majorId]);

  if (statistic.isLoading) {
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
      {statistic.data.map(({ specialty_id, specialty_name, specialty_quantity, specialty_registered }) => (
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
