import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import { useSelector } from 'react-redux';
import { deleteCompany, setOpenCofirmDialog } from 'store/reducers/companySlice';
import { dispatch } from 'store';
import { toast } from 'react-toastify';

const CompanyDeleteDialog = () => {
  const { idDelete, openCofirmDialog } = useSelector((state) => state.company);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCompany(idDelete));
      dispatch(setOpenCofirmDialog(false));
      toast.success('Xóa công ty thành công!');
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

export default CompanyDeleteDialog;
