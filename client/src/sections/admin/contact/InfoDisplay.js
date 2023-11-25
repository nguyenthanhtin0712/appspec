import { Stack, Typography } from '@mui/material';

const InfoDisplay = ({ label, value }) => {
  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 500 }}>
        {label} :
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 16 }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default InfoDisplay;
