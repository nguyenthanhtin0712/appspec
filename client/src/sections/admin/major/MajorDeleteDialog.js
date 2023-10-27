import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { dispatch } from 'store';
import { deleteMajor, setOpenCofirmDialog } from 'store/slices/majorSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const MajorDeleteDialog = () => {
  const { idDelete, openCofirmDialog } = useSelector((state) => state.major);
  const handleDelete = async () => {
    try {
      await dispatch(deleteMajor(idDelete));
      dispatch(setOpenCofirmDialog(false));
      toast.success('Xóa ngành thành công!');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <ConfirmDialog
      open={openCofirmDialog}
      onClose={() => dispatch(setOpenCofirmDialog(false))}
      title="Delete"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default MajorDeleteDialog;
