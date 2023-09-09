import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getRegistrationInformation, setMajorId } from 'store/reducers/registerSpecialtyUserSlice';
import ResultTable from 'sections/user/register_speciality/result/ResultTable';
import { Card, CardContent, CardHeader, Divider, Tab, Tabs } from '@mui/material';

const SpecialityResult = () => {
  const { majors, majorId } = useSelector((state) => state.register_specialty_user);
  const handleChange = (event, newValue) => {
    dispatch(setMajorId(newValue));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRegistrationInformation());
    };
    fetchData();
  }, []);

  if (!majors) return null;

  return (
    <Box component={Container} maxWidth="lg" sx={{ pt: 0, mt: 2 }}>
      <Card>
        <CardHeader
          subheader={
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
          }
          sx={{ p: 0 }}
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ flexGrow: 1 }}>
              <SpecialityContainer />
            </Box>
            <ResultTable />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SpecialityResult;
