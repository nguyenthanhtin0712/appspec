import React, { useCallback, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getRegistrationInformation } from 'store/reducers/registerSpecialtyUserSlice';
import { getInfoUserStudent } from 'store/reducers/authSlice';
import ResultTable from 'sections/user/register_speciality/result/ResultTable';

const SpecialityResult = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userRegistrationPeriod = useSelector((state) => state.register_specialty_user.userRegistrationPeriod);

  const fetchData = useCallback(async () => {
    await dispatch(getRegistrationInformation());
    await dispatch(getInfoUserStudent());
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const specialtyList = useMemo(() => {
    if (!userRegistrationPeriod || !currentUser || !currentUser.student_code) {
      return null;
    }
    return userRegistrationPeriod.register_specialty_detail.find((item) => item.major_id === currentUser.major_id);
  }, [userRegistrationPeriod, currentUser]);

  if (!specialtyList) {
    return null;
  }

  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Stack spacing={2}>
        <SpecialityContainer specialtyList={specialtyList.specialties}></SpecialityContainer>
        <ResultTable></ResultTable>
      </Stack>
    </Box>
  );
};

export default SpecialityResult;
