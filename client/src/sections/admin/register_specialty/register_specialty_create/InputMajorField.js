import React, { memo } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import { RecordCircle } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';

const InputMajorField = ({ specialty, values, setFieldValue }) => {
  const specialtyIndex = values.register_specialty_detail.findIndex((item) => item.specialty_id === specialty.specialty_id);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    const newSpecialties = [...values.register_specialty_detail];
    newSpecialties[specialtyIndex].specialty_quantity = newQuantity;
    setFieldValue('specialties', newSpecialties);
  };
  const theme = useTheme();
  return (
    <Grid container key={specialty.specialty_id}>
      <Grid item sm={6} xs={12} sx={{ margin: 'auto 0' }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <RecordCircle size="18" color={theme.palette.primary.main} variant="Bulk" />
          <p>{specialty.specialty_name}</p>
        </Stack>
      </Grid>
      <Grid item sm={6} xs={12}>
        <OutlinedInput
          type="number"
          size="small"
          placeholder="Nhập số lượng"
          value={values.register_specialty_detail[specialtyIndex].specialty_quantity || ''}
          onChange={handleQuantityChange}
        ></OutlinedInput>
      </Grid>
    </Grid>
  );
};

export default memo(InputMajorField);
