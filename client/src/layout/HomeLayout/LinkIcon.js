import { Link, Stack } from '@mui/material';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const LinkIcon = ({ text, link }) => {
  return (
    <Stack
      sx={{
        '&:hover': {
          marginLeft: '5px',
          transition: 'margin-left 0.2s ease' // Để làm mượt hiệu ứng nhích
        }
      }}
      direction="row"
      spacing={1}
    >
      <ArrowRightAltIcon />
      <Link
        sx={{
          '& .MuiTypography-root': {
            marginLeft: '0px'
          }
        }}
        fontSize="15px"
        color="black"
        fontWeight="500"
        rel="referrer"
        href={link}
        alignContent="center"
      >
        {text}
      </Link>
    </Stack>
  );
};

export default LinkIcon;
