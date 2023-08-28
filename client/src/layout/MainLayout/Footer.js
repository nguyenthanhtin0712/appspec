// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Footer = () => (
  <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption" textAlign="center">
      Copyright © 2023 Information Technology Faculty, Saigon University. All rights reserved.
    </Typography>
  </Stack>
);

export default Footer;
