import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { getSudentGrading } from 'store/slices/gradingSlice';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import GradingDetailTable from 'sections/admin/grading/gradingDetailTable';

const GradingDetail = () => {
  const { id } = useParams();
  const { students } = useSelector((state) => state.grading);
  useEffect(() => {
    const fetchData = () => {
      dispatch(getSudentGrading(id));
    };
    fetchData();
  }, [id]);
  if (!students) return null;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h1">
          Điểm của sinh viên
        </Typography>
      </Stack>
      <GradingDetailTable />
    </>
  );
};

export default GradingDetail;
