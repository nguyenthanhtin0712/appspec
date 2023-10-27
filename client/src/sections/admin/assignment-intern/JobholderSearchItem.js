import React, { useState } from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { dispatch } from 'store/index';
import { joinInternship } from 'store/slices/assignmentIntenship';

const JobholderSearchItem = ({ jobholder_code, id, name, join }) => {
  const [state, setState] = useState(join);
  const handleClick = () => {
    const change = async () => {
      await dispatch(joinInternship({ id, jobholder_code }));
    };
    change();
    setState(state === 0 ? 1 : 0);
  };

  return (
    <ListItemButton
      sx={{
        flexWrap: 'wrap',
        rowGap: 1,
        bgcolor: state == 1 ? 'primary.lighter' : null,
        '&:hover': {
          bgcolor: state == 1 ? 'primary.200' : null
        }
      }}
      onClick={handleClick}
    >
      <ListItemText
        primary={name}
        sx={{
          fontWeight: state == 1 ? 600 : 400
        }}
      />
    </ListItemButton>
  );
};

export default JobholderSearchItem;
