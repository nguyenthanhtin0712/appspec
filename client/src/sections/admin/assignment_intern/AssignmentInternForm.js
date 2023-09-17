import { Box, Button, CircularProgress, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Add } from 'iconsax-react';
import React, { useEffect } from 'react';
import JobholderItem from 'sections/admin/assignment_intern/JobholderItem';
import { setOpen, getJobholderIntenship } from 'store/reducers/assignmentIntenship';
import { dispatch } from 'store/index';
import { useSelector } from 'react-redux';

const AssignmentInternForm = () => {
  const { assignment_intern_id, jobholders, jobholders_isLoading } = useSelector((state) => state.assignment_internship);
  useEffect(() => {
    const getJobholders = async () => {
      await dispatch(getJobholderIntenship(assignment_intern_id));
    };
    getJobholders();
  }, [assignment_intern_id]);
  console.log('jobholders', jobholders);
  return (
    <MainCard title="Danh sách phân công">
      <Stack justifyContent="center" flexWrap="wrap" spacing={1}>
        {jobholders_isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          jobholders.length > 0 &&
          jobholders.map((jobholder) => (
            <JobholderItem key={jobholder.jobholder_code} name={jobholder.jobholder_name} total={jobholder.total}></JobholderItem>
          ))
        )}
      </Stack>
      <Stack mt={2}>
        <Button
          onClick={() => {
            dispatch(setOpen(true));
          }}
          fullWidth
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Thêm giảng viên
        </Button>
      </Stack>
    </MainCard>
  );
};

export default AssignmentInternForm;
