import { Box, Divider, Stack, Typography } from '@mui/material';
import { TickCircle } from 'iconsax-react';
import React from 'react';

const ConditionItem = ({ title, showDivider }) => {
  return (
    <Box>
      <Stack direction="row" spacing={1.5} mb={2}>
        <TickCircle color="#66af8e" />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Stack>
      {showDivider && <Divider sx={{ borderStyle: 'dashed' }} />}
    </Box>
  );
};

export default ConditionItem;
