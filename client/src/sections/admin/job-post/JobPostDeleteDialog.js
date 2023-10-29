import React from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { toast } from 'react-toastify';
import { deleteJobPost, setIdDeleteJobPost } from 'store/slices/jobPostSlice';

const JobPostDeleteDialog = () => {
  const idDelete = useSelector((state) => state.job_post.idDelete);
  const handleClick = async () => {
    try {
      await dispatch(deleteJobPost(idDelete));
      toast.success('Xóa tin thành công!');
      dispatch(setIdDeleteJobPost(0));
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi trong quá trình xóa!' + err);
    }
  };

  return (
    <ConfirmDialog
      open={!!idDelete}
      onClose={() => dispatch(setIdDeleteJobPost(0))}
      title="Xoá tin tuyển dụng"
      content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
      action={
        <Button variant="contained" color="error" onClick={handleClick}>
          Chắc chắn
        </Button>
      }
    />
  );
};

export default JobPostDeleteDialog;
