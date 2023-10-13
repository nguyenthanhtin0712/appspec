import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { setLookUpDialog } from 'store/reducers/warnedStudentSlice';
import { SearchNormal } from 'iconsax-react';
import DialogTitleCustom from 'components/DialogTitleCustom';
import EmptyBox from 'components/EmptyBox';

const LookUpStudent = () => {
  const [query, setQuery] = useState('');
  const lookUpDialog = useSelector((state) => state.warned_student.lookUpDialog);
  const handleClose = () => dispatch(setLookUpDialog(false));
  return (
    <Dialog
      open={lookUpDialog}
      onClose={handleClose}
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
          onChange={(event) => setQuery(event.target.value)}
          sx={{ mt: 0.5 }}
          fullWidth
        />
        <EmptyBox />
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default LookUpStudent;
