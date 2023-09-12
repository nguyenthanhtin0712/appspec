import { useTheme } from '@emotion/react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Chart } from 'iconsax-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CompanyItem from 'sections/admin/register_intern/CompanyItem';
import { dispatch } from 'store/index';
import { getCopanies } from 'store/reducers/registerInternUserSlice';

const CompanyList = () => {
  const theme = useTheme();
  const { list_copmnay } = useSelector((state) => state.regsiter_intern_user);
  useEffect(() => {
    const getData = () => {
      dispatch(getCopanies({}));
    };
    getData();
  }, []);
  return (
    <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
      <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
        <Chart size="25" color={theme.palette.primary.main} variant="Bulk" />
        <Typography variant="h5">Thống kê</Typography>
      </Stack>
      <Grid container spacing={2}>
        {list_copmnay.length > 0 && list_copmnay.map((data, index) => <CompanyItem key={index} data={data} />)}
      </Grid>
    </Box>
  );
};

export default CompanyList;
