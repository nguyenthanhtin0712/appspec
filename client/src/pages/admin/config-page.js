import React, { useEffect, useState } from 'react';
import { Box, Stack, Switch, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getPageConfigInfo, updateConfig } from 'store/slices/configPageSlice';
import SpecialtyDisplayDialog from 'sections/admin/config-page/SpecialtyDisplayDialog';
import InternshipGraduationDisplayDialog from 'sections/admin/config-page/InternshipGraduationDisplayDialog';

const ConfigPage = () => {
  const [specialty, setSpecialty] = useState(false);
  const [intern, setIntern] = useState(false);

  const dataConfig = useSelector((state) => state.config_page.dataConfig);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageConfigInfo());
    };
    fetchData();
  }, []);

  if (dataConfig.length === 0) return null;

  return (
    <>
      <MainCard>
        <Typography variant="h4" mb={3}>
          Cấu hình
        </Typography>
        <Stack spacing={3}>
          <BoxCofig name="Đăng ký chuyên ngành" value={dataConfig['register_specialty']?.name} onClick={() => setSpecialty(true)} />
          <BoxCofig name="Đăng ký thực tập" value={dataConfig['register_internship']?.name} onClick={() => setIntern(true)} />
          <BoxCheckBox
            name="Phê duyệt bài đăng tuyển dụng"
            value={dataConfig['confirm_post'] == 1}
            desc="Cho phép đăng tin tuyển dụng mà không cần chờ quản trị viên xét duyệt"
            switchChange={async (value) => await dispatch(updateConfig({ config_id: 'confirm_post', config_value: value }))}
          />
        </Stack>
      </MainCard>
      <SpecialtyDisplayDialog open={specialty} handleClose={() => setSpecialty(false)} />
      <InternshipGraduationDisplayDialog open={intern} handleClose={() => setIntern(false)} />
    </>
  );
};

const BoxCofig = ({ name, value, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: 2,
        cursor: 'pointer',
        border: '1.5px solid',
        borderRadius: 1.5,
        borderColor: theme.palette.divider,
        transition: 'all 0.2s ease',
        '&:hover': {
          background: theme.palette.secondary[200]
        }
      }}
    >
      <Typography fontSize={16}>{name ?? 'Chưa cấu hình'}</Typography>
      <Typography color="#00000085">{value}</Typography>
    </Box>
  );
};

const BoxCheckBox = ({ name, desc, value, switchChange }) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(value);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    switchChange(event.target.checked);
  };

  return (
    <Stack
      sx={{
        padding: 2,
        cursor: 'pointer',
        border: '1.5px solid',
        borderRadius: 1.5,
        borderColor: theme.palette.divider,
        transition: 'all 0.2s ease',
        '&:hover': {
          background: theme.palette.secondary[200]
        }
      }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography fontSize={16}>{name}</Typography>
        <Typography color="#00000085">{desc}</Typography>
      </Box>
      <Switch checked={checked} onChange={handleChange} />
    </Stack>
  );
};

export default ConfigPage;
