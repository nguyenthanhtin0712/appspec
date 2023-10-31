import { Box, Link, Stack } from '@mui/material';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const LinkIcon = ({ text, link }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        '&:hover .MuiBox-root': {
          transform: 'translateX(8px)',
          transition: 'all 0.3s ease' // Để làm mượt hiệu ứng nhích
        }
      }}
    >
      <Box>
        <ArrowRightAltIcon />
      </Box>

      <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href={link} alignContent="center">
        {text}
      </Link>
    </Stack>
  );
};

export default LinkIcon;
