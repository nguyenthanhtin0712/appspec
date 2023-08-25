import React from 'react';
import { Add, Building3 } from 'iconsax-react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import Avatar from 'components/@extended/Avatar';
import CompanySearchForm from 'sections/admin/register_intern/register_intern_create/CompanySearchForm';
import CompanyItem from 'sections/admin/register_intern/register_intern_create/CompanyItem';
import { useSelector } from 'react-redux';

const CompanyList = () => {
  const theme = useTheme();
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const companySelected = useSelector((state) => state.create_register_intern.companySelected);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8} display="flex" alignItems="center">
          <Typography variant="h5">Danh sách công ty</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" gap={1} justifyContent={matches ? 'flex-start' : 'flex-end'}>
          <CompanySearchForm />
          <Avatar
            variant="rounded"
            color="success"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              alert('Tính năng chưa khả dụng');
            }}
          >
            <Add color={theme.palette.success.darker} />
          </Avatar>
        </Grid>
      </Grid>
      {companySelected.length > 0 ? (
        <Grid container mt={1} spacing={2}>
          {companySelected.map((company) => (
            <Grid item xs={12} sm={4} key={company.company_id}>
              <CompanyItem company={company} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CompanyEmpty />
      )}
    </>
  );
};

const CompanyEmpty = () => {
  const theme = useTheme();
  return (
    <Stack justifyContent="center" alignItems="center" spacing={3} mt={3}>
      <Building3 size={100} variant="Bulk" color={theme.palette.secondary.main} />
      <Typography fontSize={17}>Chưa có công ty nào được chọn</Typography>
    </Stack>
  );
};

export default CompanyList;
