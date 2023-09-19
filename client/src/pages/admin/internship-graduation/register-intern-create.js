import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CreateReigisterInternForm from 'sections/admin/internship-graduation/register_intern_create/CreateReigisterInternForm';
import { useNavigate, useParams } from 'react-router';
import { getCompany, getInternshipGradutionInfo } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import Stack from '@mui/material/Stack';
import { ArrowRight } from 'iconsax-react';
import { useTheme } from '@mui/material';
import { formatDDMMYYYY } from 'utils/formatDateTime';

const RegisterIntern = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { Id } = useParams();
  const internshipGraduationInfo = useSelector((state) => state.create_register_intern.internshipGraduationInfo);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getInternshipGradutionInfo(Id));
      await dispatch(getCompany(Id));
      if (res.error) {
        navigate('/');
      }
    };
    fetchData();
  }, [Id, navigate]);

  if (!internshipGraduationInfo || internshipGraduationInfo.internship_graduation_id != Id) return null;

  const { openclass_time_semester, openclass_time_year } = internshipGraduationInfo.openclasstime;

  return (
    <>
      <Stack mb={2}>
        <Typography variant="h4" component="h1" mb={2}>
          Thực tập tốt nghiệp học kỳ {openclass_time_semester} năm học {openclass_time_year}
        </Typography>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <Typography variant="h6">Từ {formatDDMMYYYY(internshipGraduationInfo.internship_graduation_start_date)}</Typography>
          <ArrowRight size="25" color={theme.palette.primary.main} />
          <Typography variant="h6">Đến {formatDDMMYYYY(internshipGraduationInfo.internship_graduation_end_date)}</Typography>
        </Stack>
      </Stack>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CreateReigisterInternForm />
        </LocalizationProvider>
      </MainCard>
    </>
  );
};

export default RegisterIntern;
