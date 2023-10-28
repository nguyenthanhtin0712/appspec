import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import { deleteSubjectSchedule, setOpenCofirmDialog } from 'store/slices/subjectScheduleSlice';

const SubjectScheduleDeleteDialog = () => {
  const { openCofirmDialog, idDelete } = useSelector((state) => state.subject_schedule);

  const handleDelete = async () => {
    try {
      await dispatch(deleteSubjectSchedule(idDelete));
      dispatch(setOpenCofirmDialog(false));
      toast.success('Xóa kế hoạch thành công!');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <ConfirmDialog
      open={openCofirmDialog}
      onClose={() => dispatch(setOpenCofirmDialog(false))}
      title="Xóa kế hoạch"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default SubjectScheduleDeleteDialog;
