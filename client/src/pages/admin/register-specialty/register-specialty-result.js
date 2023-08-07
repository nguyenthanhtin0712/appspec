import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { dispatch } from 'store/index';
import { getMajors, setMajorId, setRegisterSpecialtyId } from 'store/reducers/registerSpecialtyUserSlice';
import { Box, Button, Divider, Stack, Tab, Tabs } from '@mui/material';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ResultTableAdmin from 'sections/admin/register_specialty/register_specialty_result/ResultTableAdmin';
import { ArrowRight, TableDocument } from 'iconsax-react';
import { setColumnFilters } from 'store/reducers/registerSpecialtyUserSlice';
import { useTheme } from '@mui/material/styles';
const RegisterSpecialtyResult = () => {
  const { Id } = useParams();
  const theme = useTheme();
  const { majors, majorId } = useSelector((state) => state.register_specialty_user);
  useEffect(() => {
    dispatch(getMajors(Id));
    dispatch(setRegisterSpecialtyId(Id));
  }, [Id]);

  const handleChange = (event, newValue) => {
    dispatch(setMajorId(newValue));
    dispatch(setColumnFilters([]));
  };

  if (!majors) return null;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Stack mb={3} spacing={1}>
          <Typography variant="h4" component="h1">
            Đăng ký chuyên ngành khóa 21
          </Typography>
          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography variant="h6">Từ 00:00 30/07/2023</Typography>
            <ArrowRight size="25" color={theme.palette.primary.main} />
            <Typography variant="h6">Đến 00:00 30/07/2023</Typography>
          </Stack>
        </Stack>
        <Box my="auto">
          <Button variant="contained" color="success" startIcon={<TableDocument />}>
            Xuất dữ liệu
          </Button>
        </Box>
      </Stack>
      <Box>
        <Stack spacing={2}>
          <Box>
            <Tabs
              value={majorId}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {majors.map((major) => (
                <Tab key={major.major_id} value={major.major_id} label={`Ngành ${major.major_name}`} />
              ))}
            </Tabs>
            <Divider />
          </Box>
          <Box>
            <SpecialityContainer></SpecialityContainer>
          </Box>
          <ResultTableAdmin></ResultTableAdmin>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterSpecialtyResult;
