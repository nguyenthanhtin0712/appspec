import Grid from '@mui/material/Grid';
import LoadingBox from 'components/LoadingBox';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CompanyItem from 'sections/user/register_internship/CompanyItem';
import { dispatch } from 'store/index';
import { getCompanies } from 'store/slices/registerInternUserSlice';

const CompanyList = () => {
  const { list_company } = useSelector((state) => state.register_intern_user);
  useEffect(() => {
    const getData = async () => {
      await dispatch(getCompanies());
    };
    getData();
  }, []);

  if (list_company.length === 0) return <LoadingBox height={200} />;

  return (
    <Grid container spacing={2}>
      {list_company.length > 0 && list_company.map((data, index) => <CompanyItem key={index} data={data} />)}
    </Grid>
  );
};

export default CompanyList;
