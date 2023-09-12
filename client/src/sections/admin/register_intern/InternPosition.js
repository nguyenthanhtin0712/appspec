import { Box, Stack, Typography } from '@mui/material';
import { RecordCircle } from 'iconsax-react';

const InternPosition = ({ name }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={2}>
        <RecordCircle size="20" color={theme.palette.primary.main} variant="Bulk" />
        <Typography>{name}</Typography>
      </Stack>
      <Box bgcolor={theme.palette.success.main} color="#fff" px={1} py={0.5} borderRadius={50}>
        0/3
      </Box>
    </Stack>
  );
};
export default InternPosition;
