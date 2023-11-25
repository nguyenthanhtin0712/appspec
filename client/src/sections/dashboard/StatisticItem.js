import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import CountUp from 'react-countup';

const StatisticItem = ({ title, count, icon }) => {
  return (
    <MainCard>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography variant="h4">{count ? <CountUp end={count} duration={5} /> : '0'}</Typography>
          <Typography color="secondary">{title}</Typography>
        </Stack>
        <Box>{icon}</Box>
      </Stack>
    </MainCard>
  );
};

export default StatisticItem;
