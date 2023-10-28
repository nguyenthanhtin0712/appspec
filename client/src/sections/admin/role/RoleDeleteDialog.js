import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import { useSelector } from 'react-redux';
import { deleteRole, setOpenCofirmDialog } from 'store/slices/roleSlice';
import { dispatch } from 'store';
import { toast } from 'react-toastify';

const RoleDeleteDialog = () => {
  const { idDelete, openCofirmDialog } = useSelector((state) => state.role);

  const handleDelete = async () => {
    try {
      await dispatch(deleteRole(idDelete));
      dispatch(setOpenCofirmDialog(false));
      toast.success('Xóa nhóm quyền thành công!');
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
    ></ConfirmDialog>
  );
};

export default RoleDeleteDialog;
