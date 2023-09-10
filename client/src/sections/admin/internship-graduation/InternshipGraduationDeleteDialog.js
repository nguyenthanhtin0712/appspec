import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { setOpenCofirmDialog } from 'store/reducers/internshipGraduationSlice';

const InternshipGraduationDeleteDialog = () => {
  const { idDelete, openCofirmDialog } = useSelector((state) => state.internship_graduation);
  const handleDelete = async () => {
    try {
      await dispatch(deleteRegisterSpecalty(idDelete));
      dispatch(setOpenCofirmDialog(false));
      toast.success('Xóa đợt đăng ký thành công!');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <ConfirmDialog
      open={openCofirmDialog}
      onClose={() => dispatch(setOpenCofirmDialog(false))}
      title="Xoá đợt thực tập tốt nghiệp"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default InternshipGraduationDeleteDialog;
