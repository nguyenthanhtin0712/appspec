import React from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import SpecialityItem from './SpecialityItem';
import { useSelector } from 'react-redux';

const SpecialityContainer = () => {
  let specialtyList = useSelector((state) => state.register_specialty.userRegistrationPeriod.register_specialty_detail);
  return (
    <MainCard title="Hiện trạng đăng ký">
      <Grid container spacing={2}>
        {specialtyList.map(({ specialty_id, specialty_name, specialty_quantity, specialty_registered }) => (
          <SpecialityItem
            key={specialty_id}
            name={specialty_name}
            total={specialty_quantity}
            registered_quantity={specialty_registered}
          ></SpecialityItem>
        ))}
      </Grid>
    </MainCard>
  );
};

export default SpecialityContainer;
