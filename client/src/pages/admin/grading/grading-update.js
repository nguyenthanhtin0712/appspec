import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import GradingUpdateTable from 'sections/admin/grading/gradingUpdateTable';
import { getSudentGrading } from 'store/reducers/gradingSlice';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';

const GradingUpdate = () => {
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
      <Typography variant="h4" component="h1" mb={1}>
        Danh sách sinh viên
      </Typography>
      <GradingUpdateTable id={id} />
    </>
  );
};

export default GradingUpdate;
