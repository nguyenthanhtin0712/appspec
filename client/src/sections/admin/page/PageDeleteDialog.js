import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { deletePage, setIdDeletePage } from 'store/reducers/pageSlice';
import { toast } from 'react-toastify';

const PageDeleteDialog = () => {
  const idDelete = useSelector((state) => state.page.idDelete);
  const handleClick = async () => {
    try {
      await dispatch(deletePage(idDelete));
      toast.success('Xóa trang thành công!');
      dispatch(setIdDeletePage(0));
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi trong quá trình xóa!' + err);
    }
  };

  return (
    <ConfirmDialog
      open={!!idDelete}
      onClose={() => dispatch(setIdDeletePage(0))}
      title="Xoá trang"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleClick}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default PageDeleteDialog;
