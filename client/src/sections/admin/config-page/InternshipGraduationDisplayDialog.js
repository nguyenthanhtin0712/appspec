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
import { getAllInternshipGraduation, getPageConfigInfo, updateConfig } from 'store/slices/configPageSlice';
import { toast } from 'react-toastify';

const InternshipGraduationDisplayDialog = ({ open, handleClose }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const dataInternshipGraduation = useSelector((state) => state.config_page.dataInternshipGraduation);
  useEffect(() => {
    dispatch(getAllInternshipGraduation());
  }, []);

  if (!dataInternshipGraduation) return null;

  const handleSubmit = () => {
    const result = dispatch(updateConfig({ config_id: 'register_intern', config_value: value.internship_graduation_id }));
    if (result) {
      dispatch(getPageConfigInfo());
      handleClose();
      toast.success('Lưu thành công');
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Chọn đợt thực tập tốt nghiệp</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="select-internship-graduation"
          options={dataInternshipGraduation}
          getOptionLabel={(option) =>
            `Học kỳ ${option.openclasstime.openclass_time_semester} - Năm học ${option.openclasstime.openclass_time_year}`
          }
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.internship_graduation_id}>
              {`Học kỳ ${option.openclasstime.openclass_time_semester} - Năm học ${option.openclasstime.openclass_time_year}`}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} placeholder="Chọn đợt thực tập tốt nghiệp" />}
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

export default InternshipGraduationDisplayDialog;
