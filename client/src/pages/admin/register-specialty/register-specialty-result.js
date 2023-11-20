import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { dispatch } from 'store/index';
import { setMajorId } from 'store/slices/registerSpecialtyUserSlice';
import { Box, Button, Divider, Fade, Menu, MenuItem, Stack, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
import ResultTableAdmin from 'sections/admin/register_specialty/register-specialty-result/ResultTableAdmin';
import { ArrowRight, Printer } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { ExportResultRegisterSpecialty } from 'export-excel/export-result-register-specialty';
import SpecialityContainer from 'sections/admin/register_specialty/register-specialty-result/SpecialityContainer';

const RegisterSpecialtyResult = () => {
  const theme = useTheme();
  const { majors, majorId, userRegistrationPeriod } = useSelector((state) => state.register_specialty_user);

  const handleChange = (event, newValue) => {
    dispatch(setMajorId(newValue));
  };

  if (!majors || !userRegistrationPeriod) return null;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Stack mb={3} spacing={1}>
          <Typography variant="h4" component="h1">
            {userRegistrationPeriod.register_specialty_name}
          </Typography>
          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography variant="h6">Từ {formatDateTimeDisplay(userRegistrationPeriod.register_specialty_start_date)}</Typography>
            <ArrowRight size="25" color={theme.palette.primary.main} />
            <Typography variant="h6">Đến {formatDateTimeDisplay(userRegistrationPeriod.register_specialty_end_date)}</Typography>
          </Stack>
        </Stack>
        <MenuExport />
      </Stack>
      <Box>
        <Stack spacing={2}>
          <Box>
            <Tabs
              value={majorId}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {majors.map((major) => (
                <Tab key={major?.major_id} value={major?.major_id} label={`Ngành ${major?.major_name}`} />
              ))}
            </Tabs>
            <Divider />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SpecialityContainer />
          </Box>
          <ResultTableAdmin />
        </Stack>
      </Box>
    </>
  );
};

const MenuExport = () => {
  const { majors, userRegistrationPeriod } = useSelector((state) => state.register_specialty_user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (major_id) => {
    ExportResultRegisterSpecialty(userRegistrationPeriod.register_specialty_id, major_id);
    handleClose();
  };

  return (
    <Box my="auto">
      <Button
        variant="contained"
        color="success"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<Printer />}
      >
        Xuất dữ liệu
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ mt: 1 }}
      >
        {majors.map((major) => (
          <MenuItem onClick={() => handleExport(major?.major_id)} key={major?.major_id}>
            {major?.major_name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default RegisterSpecialtyResult;
