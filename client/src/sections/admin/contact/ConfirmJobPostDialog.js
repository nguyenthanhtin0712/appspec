import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { confirmJobPost, getJobPostById, setViewId } from 'store/slices/manageJobPostSlice';
import DialogTitleCustom from 'components/DialogTitleCustom';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LoadingBox from 'components/LoadingBox';
import getJobPostStatus from 'utils/getJobPostStatus';

const ConfirmJobPostDialog = () => {
  const { viewId, viewData, isLoadingViewData } = useSelector((state) => state.manage_job_post);

  const handleClose = () => {
    dispatch(setViewId(0));
  };

  const handleConfirm = async (value) => {
    await dispatch(confirmJobPost({ id: viewId, confirm: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getJobPostById(viewId));
    };
    if (viewId) fetchData();
  }, [viewId]);

  const postStatus = getJobPostStatus(viewData?.job_post_confirm);

  return (
    <Dialog open={!!viewId} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitleCustom onClose={handleClose}>
        {isLoadingViewData ? (
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '400px' }} />
        ) : (
          <Box display="flex" gap={2}>
            {viewData?.job_post_title}
            <Chip label={postStatus.text} color={postStatus.color} />
          </Box>
        )}
      </DialogTitleCustom>
      <DialogContent>
        {isLoadingViewData ? <LoadingBox height={200} /> : <div dangerouslySetInnerHTML={{ __html: viewData?.job_post_desc }} />}
      </DialogContent>
      <DialogActions>
          <Button onClick={() => handleConfirm(2)} variant="contained" color="error">
            Huỷ tin
          </Button>
          <Button onClick={() => handleConfirm(1)} variant="contained" color="success">
            Phê duyệt
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmJobPostDialog;
