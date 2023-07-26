import React from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import SpecialityItem from './SpecialityItem';

const arrSpec = [
  { id: 1, name: 'Kỹ thuật phần mềm', total: 375, registered_quantity: 300 },
  { id: 2, name: 'Hệ thống thông tin', total: 75, registered_quantity: 60 },
  { id: 3, name: 'Khoa học máy tính', total: 75, registered_quantity: 40 },
  { id: 4, name: 'Kỹ thuật máy tính', total: 75, registered_quantity: 50 }
];
const SpecialityContainer = () => {
  return (
    <MainCard title="Hiện trạng đăng ký">
      <Grid container spacing={2}>
        {arrSpec.map((item) => (
          <SpecialityItem key={item.id} name={item.name} total={item.total} registered_quantity={item.registered_quantity}></SpecialityItem>
        ))}
      </Grid>
    </MainCard>
  );
};

export default SpecialityContainer;
