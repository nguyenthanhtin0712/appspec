import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import InputField from 'components/input/InputField';
import React from 'react';

const RoleCreate = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Thêm nhóm quyền</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <Grid item xs={12} mb={2}>
              <InputField label="Tên nhóm quyền" placeholder="Vui lòng nhập tên nhóm quyền"></InputField>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <MainCard title="Quản lý người dùng">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography
                            style={{
                              formControlLabel: { fontSize: '1rem', '& label': { fontSize: '1rem' } }
                            }}
                          >
                            Thêm người dùng
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography
                            style={{
                              formControlLabel: { fontSize: '1rem', '& label': { fontSize: '1rem' } }
                            }}
                          >
                            Cập nhật người dùng
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography
                            style={{
                              formControlLabel: { fontSize: '1rem', '& label': { fontSize: '1rem' } }
                            }}
                          >
                            Xoá người dùng
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default RoleCreate;
