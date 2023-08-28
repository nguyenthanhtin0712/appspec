import React, { Fragment, useState, useMemo } from 'react';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'store';
import CountdownTimer from 'components/CountdownTimer';
import { userRegisteringForSpecialty } from 'store/reducers/registerSpecialtyUserSlice';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [speciality_id, setSpecialityId] = useState('');
  const [error, setError] = useState(false);
  const { statistic, registrationPageInfo } = useSelector((state) => state.register_specialty_user);
  const { register_specialty_start_date, register_specialty_end_date } = registrationPageInfo;

  const handleChange = (event) => {
    setSpecialityId(event.target.value);
    setError(false);
  };

  const currentTime = useMemo(() => new Date(), []);
  const isBeforeRegistrationTime = useMemo(() => {
    return currentTime < new Date(register_specialty_start_date);
  }, [register_specialty_start_date, currentTime]);

  const isAfterRegistrationTime = useMemo(() => {
    return currentTime > new Date(register_specialty_end_date);
  }, [register_specialty_end_date, currentTime]);

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

  const renderForm = () => {
    return (
      <Stack spacing={1}>
        <Typography gutterBottom>
          Sinh viên có thể THAY ĐỔI chuyên ngành đã đăng ký trong thời gian đăng ký còn hiệu lực. Kết quả cuối cùng sẽ được xét dựa theo
          Điều lệ đăng ký chuyên ngành.
        </Typography>
        <form style={{ minWidth: 120, display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <Select value={speciality_id} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="" sx={{ color: 'text.secondary' }}>
                Chọn chuyên ngành bạn muốn đăng ký
              </MenuItem>
              {statistic?.map(({ specialty_id, specialty_name }) => (
                <MenuItem value={specialty_id} key={specialty_id}>
                  {specialty_name}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText error>Vui lòng chọn chuyên ngành</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end', mt: 1 }}>
            Đăng ký
          </Button>
        </form>
      </Stack>
    );
  };

  const CountDown = () => {
    return (
      <>
        <Typography gutterBottom textAlign={'center'} fontSize={'18px'} fontWeight={'600'} textTransform={'uppercase'}>
          Chưa tới thời gian đăng ký chuyên ngành
        </Typography>
        <CountdownTimer targetTime={new Date(register_specialty_start_date).getTime()} />
      </>
    );
  };

  const OutOfTime = () => {
    return (
      <>
        <Typography gutterBottom>Đã hết thời gian đăng ký chuyên ngành....</Typography>
      </>
    );
  };

  return (
    <MainCard title="Đăng ký chuyên ngành">
      <Container maxWidth="sm">
        {isAfterRegistrationTime ? <OutOfTime /> : isBeforeRegistrationTime ? <CountDown /> : renderForm()}
      </Container>
    </MainCard>
  );
};

export default RegisterForm;
