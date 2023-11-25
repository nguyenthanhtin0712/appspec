import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getAllRegisterSpecialty, getPageConfigInfo, updateConfig } from 'store/slices/configPageSlice';
import { toast } from 'react-toastify';

const SpecialtyDisplayDialog = ({ open, handleClose }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const dataRegisterSpecialty = useSelector((state) => state.config_page.dataRegisterSpecialty);
  useEffect(() => {
    dispatch(getAllRegisterSpecialty());
  }, []);
  if (!dataRegisterSpecialty) return null;

  const handleSubmit = async () => {
    const result = await dispatch(updateConfig({ config_id: 'register_specialty', config_value: value.register_specialty_id }));
    if (result) {
      await dispatch(getPageConfigInfo());
      handleClose();
      toast.success('Lưu thành công');
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Chọn đợt đăng ký chuyên ngành</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
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

export default SpecialtyDisplayDialog;
