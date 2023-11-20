import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import { getStatistic } from 'store/slices/registerOpenClassSlice';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import FilterOpenClass from 'sections/user/register-open-class/statistic/FilterOpenClass';
import OpenClassTable from 'sections/user/register-open-class/statistic/OpenClassTable';

const StatisticOpenClass = () => {
  const timeOption = useSelector((state) => state.register_open_class.statistic.timeOption);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStatistic(timeOption));
    };
    fetchData();
  }, [timeOption]);
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Thông tin đăng ký nguyện vọng học lại của sinh viên" sx={{ minHeight: 'calc(100vh - 100px)' }}>
        <FilterOpenClass />
        <OpenClassTable />
      </MainCard>
    </Container>
  );
};

export default StatisticOpenClass;
