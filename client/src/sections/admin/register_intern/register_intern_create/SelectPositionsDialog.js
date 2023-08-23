import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getAllRecruitmentPosition, setOpenPositionDialog } from 'store/reducers/createRegisterInternSlice';
import AsyncAutocompleteField from 'components/input/AsyncAutocompleteField';

export default function SelectPositionsDialog() {
  const { openPositionDialog, positionOptions } = useSelector((state) => state.create_register_intern);
  const handleClose = () => dispatch(setOpenPositionDialog(false));
  return (
    <Dialog
      maxWidth="xs"
      open={openPositionDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Thêm vị trí thực tập</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <AsyncAutocompleteField
              id="subject_previous"
              placeholder="Chọn các vị trí thực tập"
              loading={positionOptions.isLoading}
              options={positionOptions?.data}
              // value={values.subject_previous}
              fetchOptions={() => dispatch(getAllRecruitmentPosition())}
              isOptionEqualToValue={(option, value) => option.position_id === value.position_id}
              getOptionLabel={(option) => option.position_name}
              // onChange={(event, newValue) => setFieldValue('subject_previous', newValue)}
              multiple
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose} variant="contained" autoFocus>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
