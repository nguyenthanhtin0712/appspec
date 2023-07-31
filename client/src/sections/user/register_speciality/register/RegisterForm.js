import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { dispatch } from 'store/index';
import { userRegisteringForSpecialty } from 'store/reducers/registerSpecialtySlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ specialtyList }) => {
  const navigate = useNavigate();
  const [speciality_id, setSpecialityId] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setSpecialityId(event.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!speciality_id) setError(true);
    else {
      const result = await dispatch(userRegisteringForSpecialty(speciality_id));
      if (result) {
        toast.success('Đăng ký chuyên ngành thành công');
        navigate('/register_speciality/result');
      }
    }
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
              <Select value={speciality_id} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="" sx={{ color: 'text.secondary' }}>
                  Chọn chuyên ngành bạn muốn đăng ký
                </MenuItem>
                {specialtyList.map(({ specialty_id, specialty_name }) => (
                  <MenuItem value={specialty_id} key={specialty_id}>
                    {specialty_name}
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
