import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getAllRegisterSpecialty, getPageConfigInfo, updateConfig } from 'store/reducers/configPageSlice';

const ConfigPage = () => {
  const [open, setOpen] = useState(false);
  const dataConfig = useSelector((state) => state.config_page.dataConfig);

  useEffect(() => {
    dispatch(getPageConfigInfo());
  }, []);

  if (!dataConfig) return null;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MainCard>
        <Typography variant="h4" mb={3}>
          Cấu hình
        </Typography>
        <Stack spacing={3}>
          <Box onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
            <Typography fontSize={16}>Đăng ký chuyên ngành</Typography>
            <Typography color="#00000085" gutterBottom>
              {dataConfig['register_specialty']?.name ?? 'Chưa chọn đợt hiển thị'}
            </Typography>
          </Box>
          <Box
            onClick={() => {
              alert('Chức năng chưa khả dụng');
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Typography fontSize={16}>Đăng ký thực tập</Typography>
            <Typography color="#00000085" gutterBottom>
              Đăng ký thực tập học kỳ 2, năm học 2022 - 2023
            </Typography>
          </Box>
        </Stack>
      </MainCard>
      <SpecialtyDisplayDialog open={open} handleClose={handleClose} />
    </>
  );
};

const SpecialtyDisplayDialog = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const dataRegisterSpecialty = useSelector((state) => state.config_page.dataRegisterSpecialty);
  useEffect(() => {
    dispatch(getAllRegisterSpecialty());
  }, []);
  if (!dataRegisterSpecialty) return null;

  const handleSubmit = () => {
    const result = dispatch(updateConfig({ display_config_id: 'register_specialty', display_config_value: value.register_specialty_id }));
    if (result) {
      dispatch(getPageConfigInfo());
      handleClose();
      toast.success('Lưu thành công');
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chọn đợt đăng ký chuyên ngành</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="select-register-specialty"
          options={dataRegisterSpecialty}
          getOptionLabel={(option) => option.register_specialty_name}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.register_specialty_id}>
              {option.register_specialty_name}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} placeholder="Chọn đợt đăng ký chuyên ngành" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button variant="contained" disabled={Boolean(!value)} onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigPage;
