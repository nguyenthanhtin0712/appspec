import React, { useState } from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { dispatch } from 'store/index';
import { joinInternship } from 'store/reducers/assignmentIntenship';

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
