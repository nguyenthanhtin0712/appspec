import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import InputMajorField from './InputMajorField';

const MajorField = ({ major, setFieldValue, values }) => {
  return (
    <Grid item xs={6}>
      <MainCard sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1} mb={2}>
          <Typography variant="h5">Ngành {major.major_name}</Typography>
        </Stack>
        <Stack spacing={2} direction="column">
          {major.specialties.length > 0 &&
            major.specialties.map((specialty) => (
              <InputMajorField key={specialty.specialty_id} setFieldValue={setFieldValue} values={values} specialty={specialty} />
            ))}
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default MajorField;
