import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const IconAction = ({ title, href, onClick, icon, ...props }) => {
  return (
    <Tooltip title={title}>
      <IconButton component={href ? Link : undefined} to={href ?? undefined} onClick={onClick ?? undefined} {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default IconAction;
