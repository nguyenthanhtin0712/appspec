import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import { deleteWarnedStudent, setIdDelete } from 'store/slices/warnedStudentSlice';

const WarnedStudentDeleteDialog = () => {
  const { idDelete } = useSelector((state) => state.warned_student);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWarnedStudent(idDelete));
      dispatch(setIdDelete(0));
      toast.success('Xóa đợt thành công!');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <ConfirmDialog
      open={!!idDelete}
      onClose={() => dispatch(setIdDelete(0))}
      title="Xóa đợt"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default WarnedStudentDeleteDialog;
