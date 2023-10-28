import { Box, Drawer } from '@mui/material';
import React from 'react';
import JobholderSearch from 'sections/admin/assignment-intern/JobholderSearch';
import { setOpen, getJobholderIntenship, fetchData } from 'store/slices/assignmentIntenship';
import { dispatch } from 'store/index';
import { useSelector } from 'react-redux';

const JobholderDialog = () => {
  const { open, assignment_intern_id, columnFilters, globalFilter, sorting, pagination, status } = useSelector(
    (state) => state.assignment_internship
  );

  const setClose = async () => {
    await dispatch(setOpen(false));
    await dispatch(getJobholderIntenship(assignment_intern_id));
    await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id }));
  };

  return (
    <Drawer anchor="right" open={open} onClose={setClose}>
      <Box
        sx={{
          width: 300
        }}
        role="presentation"
      >
        <JobholderSearch />
      </Box>
    </Drawer>
  );
};

export default JobholderDialog;
