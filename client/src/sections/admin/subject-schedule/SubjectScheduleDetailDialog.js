import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { setIdSelect, showSubjectSchedule } from 'store/slices/subjectScheduleSlice';
import { AppBar, Button, Slide, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { CloseCircle, Printer } from 'iconsax-react';
import AnimateButton from 'components/@extended/AnimateButton';
import SujectScheduleDetailTable from 'sections/admin/subject-schedule/SujectScheduleDetailTable';
import Skeleton from '@mui/material/Skeleton';
import LoadingBox from 'components/LoadingBox';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubjectScheduleDetailDialog = () => {
  const theme = useTheme();
  const { idSelect, dataDetail } = useSelector((state) => state.subject_schedule);
  const open = !!idSelect;

  const handleClose = () => {
    dispatch(setIdSelect(0));
  };

  useEffect(() => {
    if (idSelect != 0) dispatch(showSubjectSchedule(idSelect));
  }, [idSelect]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
      <AppBar
        sx={{
          position: 'relative',
          boxShadow: theme.customShadows.z2,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          bgcolor: '#fff'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 66 }}>
          <Typography sx={{ flex: 1, color: '#000' }} variant="h4" component="div">
            {!dataDetail ? (
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '300px' }} />
            ) : (
              `Kế hoạch mở nhóm học phần học kỳ ${dataDetail.infomation.openclass_time_semester} năm học ${dataDetail.infomation.openclass_time_year}`
            )}
          </Typography>
          <Stack direction="row" spacing={2}>
            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
              <Button variant="shadow" onClick={() => alert('Tính năng đang phát triển')} color="success" startIcon={<Printer />}>
                Xuất Excel
              </Button>
            </AnimateButton>
            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
              <Button variant="shadow" color="error" onClick={handleClose} aria-label="close" startIcon={<CloseCircle />}>
                Đóng
              </Button>
            </AnimateButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {!dataDetail ? <LoadingBox /> : <SujectScheduleDetailTable rows={dataDetail.subjects} />}
    </Dialog>
  );
};

export default memo(SubjectScheduleDetailDialog);
