import { Box, Drawer } from '@mui/material';
import React from 'react';
import JobholderSearch from 'sections/admin/assignment_intern/JobholderSearch';
import { setOpen } from 'store/reducers/assignmentIntenship';
import { dispatch } from 'store/index';
import { useSelector } from 'react-redux';

const JobholderDialog = () => {
  const { open } = useSelector((state) => state.assignment_internship);

  const setClose = () => () => {
    dispatch(setOpen(false));
  };

  return (
    <Drawer anchor="right" open={open} onClose={setClose()}>
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
