import { Box, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React from 'react';

const StatisticItem = ({ title, count, icon }) => {
  return (
    <MainCard>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography variant="h4">{count}</Typography>
          <Typography color="secondary">{title}</Typography>
        </Stack>
        <Box>{icon}</Box>
      </Stack>
    </MainCard>
  );
};

export default StatisticItem;
