import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CompanyItem from 'sections/admin/register_intern/CompanyItem';
import { dispatch } from 'store/index';
import { getCompanies } from 'store/reducers/registerInternUserSlice';

const CompanyList = () => {
  const { list_company } = useSelector((state) => state.regsiter_intern_user);
  useEffect(() => {
    const getData = async () => {
      await dispatch(getCompanies());
    };
    getData();
  }, []);

  if (list_company.length === 0)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Grid container spacing={2}>
      {list_company.length > 0 && list_company.map((data, index) => <CompanyItem key={index} data={data} />)}
    </Grid>
  );
};

export default CompanyList;
