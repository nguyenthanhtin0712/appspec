import React from 'react';
import Stack from '@mui/material/Stack';
import LogoSection from 'components/logo';
import { Link, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import TextWithIcon from 'layout/HomeLayout/TextWithIcon';

const Footer = () => {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" sx={{ mt: 'auto', backgroundColor: '#D9D9D8' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} width="80%" sx={{ p: '30px' }} spacing={4}>
          <Stack width={{ xs: '100%', sm: '70%' }} spacing={2}>
            <Stack direction="row" alignItems="center">
              <LogoSection />
              <Stack ml={3} spacing={1}>
                <Typography variant="h4" gutterBottom>
                  Trường Đại học Sài Gòn
                </Typography>
                <Typography variant="button" gutterBottom>
                  SAIGON UNIVERCITY OF SCIENCE AND TECHNOLOGY
                </Typography>
              </Stack>
            </Stack>
            <TextWithIcon icon={<LocationOnIcon />} text="Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM" />
            <TextWithIcon icon={<LocalPhoneIcon />} text="Hotline: (028) 38382 664" />
            <TextWithIcon icon={<EmailIcon />} text="Email: vpkcntt@sgu.edu.vn" />
            <TextWithIcon icon={<LocalPhoneIcon />} text="Phone: (028) 38382 664 - 0366 686 557" />
          </Stack>
          <Stack width={{ xs: '100%', sm: '30%' }} spacing={3}>
            <Stack direction="row" alignItems="center" padding={2}>
              <Stack ml={3} spacing={1}>
                <Typography variant="h4" gutterBottom>
                  Liên kết WEB
                </Typography>
                <Link fontSize="16px" fontWeight="700" rel="referrer" href="http://thongtindaotao.sgu.edu.vn/" underline="hover">
                  Trường đại học Sài Gòn
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: '#b41d24', p: '30px' }} spacing={1}>
        <Typography color="white" fontSize="16px" fontWeight="400" textAlign="center">
          Bản quyền thuộc về Đại học Sài Gòn
        </Typography>
        <Typography color="white" fontSize="16px" fontWeight="400" textAlign="center">
          Địa chỉ: Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM
        </Typography>
        <Typography color="white" fontSize="16px" fontWeight="400" textAlign="center">
          Điện thoại: (028) 38382 664 - 0366 686 557
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
