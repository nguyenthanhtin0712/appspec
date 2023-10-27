import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { lookUpStudent, setLookUpDialog } from 'store/slices/warnedStudentSlice';
import { SearchNormal } from 'iconsax-react';
import DialogTitleCustom from 'components/DialogTitleCustom';
import AnimateButton from 'components/@extended/AnimateButton';
import LookUpTable from 'sections/admin/warned-student/LookUpTable';

const LookUpStudent = () => {
  const [query, setQuery] = useState('');
  const { open } = useSelector((state) => state.warned_student.lookUpDialog);
  const handleClose = () => dispatch(setLookUpDialog({ open: false }));

  const handleClick = async () => {
    if (query) {
      await dispatch(lookUpStudent(query));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitleCustom onClose={handleClose}>Tra cứu sinh viên</DialogTitleCustom>
      <DialogContent>
        <OutlinedInput
          id="query"
          type="text"
          value={query}
          name="query"
          placeholder="Nhập mã sinh viên, họ và tên..."
          startAdornment={
            <InputAdornment position="start">
              <SearchNormal />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <AnimateButton>
                <Button variant="contained" onClick={handleClick} fullWidth>
                  Tìm kiếm
                </Button>
              </AnimateButton>
            </InputAdornment>
          }
          onChange={(event) => setQuery(event.target.value)}
          sx={{ mt: 0.5, pr: 1, mb: 2 }}
          fullWidth
        />
        <LookUpTable />
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default LookUpStudent;
