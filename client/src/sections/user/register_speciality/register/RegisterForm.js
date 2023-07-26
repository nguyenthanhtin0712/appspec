import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

const arrSpec = [
  { id: 1, name: 'Kỹ thuật phần mềm', total: 375, registered_quantity: 300 },
  { id: 2, name: 'Hệ thống thông tin', total: 75, registered_quantity: 60 },
  { id: 3, name: 'Khoa học máy tính', total: 75, registered_quantity: 40 },
  { id: 4, name: 'Kỹ thuật máy tính', total: 75, registered_quantity: 50 }
];
const RegisterForm = () => {
  const [speciality, setSpeciality] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setSpeciality(event.target.value);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!speciality) setError(true);
  };
  return (
    <MainCard title="Đăng ký chuyên ngành">
      <Grid container spacing={2}>
        <Grid item xs={8} mx="auto">
          <Typography gutterBottom>
            Sinh viên có thể THAY ĐỔI chuyên ngành đã đăng ký trong thời gian đăng ký còn hiệu lực. Kết quả cuối cùng sẽ được xét dựa theo
            Điều lệ đăng ký chuyên ngành.
          </Typography>
          <form style={{ minWidth: 120 }} onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Select value={speciality} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="" sx={{ color: 'text.secondary' }}>
                  Chọn chuyên ngành bạn muốn đăng ký
                </MenuItem>
                {arrSpec.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText error>Vui lòng chọn chuyên ngành</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" sx={{ float: 'right', mt: 1 }}>
              Đăng ký
            </Button>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RegisterForm;
