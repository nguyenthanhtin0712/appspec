import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LogoSection from 'components/logo';
import { Container, Grid, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import TextWithIcon from 'layout/HomeLayout/TextWithIcon';
import LinkIcon from 'layout/HomeLayout/LinkIcon';

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: theme.palette.secondary.light }}>
        <Container sx={{ py: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} display="flex" rowGap={2} sx={{ flexDirection: 'column' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LogoSection width={80} />
                <Stack spacing={0.5}>
                  <Typography variant="h4" fontWeight={700} sx={{ textTransform: 'uppercase' }} gutterBottom>
                    Trường Đại học Sài Gòn
                  </Typography>
                  <Typography variant="h6" fontWeight={500} sx={{ textTransform: 'uppercase' }} gutterBottom>
                    Khoa công nghệ thông tin
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <TextWithIcon
                  icon={<LocationOnIcon fontSize="small" />}
                  text="Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM"
                />
                <TextWithIcon icon={<LocalPhoneIcon fontSize="small" />} text="Hotline: (028) 38382 664" />
                <TextWithIcon icon={<EmailIcon fontSize="small" />} text="Email: vpkcntt@sgu.edu.vn" />
                <TextWithIcon icon={<LocalPhoneIcon fontSize="small" />} text="Phone: (028) 38382 664 - 0366 686 557" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <Typography variant="h4" gutterBottom>
                  Liên kết
                </Typography>
                <Stack spacing={0.5}>
                  <LinkIcon text="Trường đại học Sài Gòn" link="http://sgu.edu.vn/" />
                  <LinkIcon text="Khoa công nghệ thông tin" link="http://fit.sgu.edu.vn/" />
                  <LinkIcon text="Thông tin đào tạo" link="https://thongtindaotao.sgu.edu.vn/" />
                  <LinkIcon text="Phòng đào tạo" link="http://daotao.sgu.edu.vn/" />
                  <LinkIcon text="Phòng công tác sinh viên" link="http://ctsv.sgu.edu.vn/" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <Box sx={{ backgroundColor: theme.palette.primary.darker, py: '20px', px: '10px' }}>
        <Typography color="white" fontSize="16px" fontWeight="400" textAlign="center">
          Bản quyền thuộc về Khoa Công nghệ thông tin - Trường Đại học Sài Gòn
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
