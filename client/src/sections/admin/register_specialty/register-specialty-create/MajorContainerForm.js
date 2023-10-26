import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MajorField from './MajorField';

const MajorContainerForm = ({ majorList, setFieldValue, values }) => {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={3} alignItems="stretch">
          {majorList.map((major) => {
            if (major.specialties.length > 0) {
              return <MajorField setFieldValue={setFieldValue} values={values} key={major.major_id} major={major}></MajorField>;
            }
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Lưu ý: Nếu không nhập số lượng thì mặc định bằng 0 </Typography>
      </Grid>
    </>
  );
};

export default MajorContainerForm;
