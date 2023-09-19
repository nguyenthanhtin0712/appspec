import React, { useState } from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { dispatch } from 'store/index';
import { joinInternship, getJobholderIntenship, fetchData } from 'store/reducers/assignmentIntenship';
import { useSelector } from 'react-redux';

const JobholderSearchItem = ({ jobholder_code, id, name, join }) => {
  const [state, setState] = useState(join);
  const { columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id } = useSelector(
    (state) => state.assignment_internship
  );
  const handleClick = () => {
    const change = async () => {
      await dispatch(joinInternship({ id, jobholder_code }));
      await dispatch(getJobholderIntenship(id));
      await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id }));
    };
    change();
    setState(state === 0 ? 1 : 0);
  };

  return (
    <ListItemButton
      sx={{ flexWrap: 'wrap', rowGap: 1 }}
      onClick={handleClick}
      style={
        state == 1
          ? {
              backgroundColor: 'lightgreen',
              fontWeight: 'bold'
            }
          : {}
      }
    >
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

export default JobholderSearchItem;
