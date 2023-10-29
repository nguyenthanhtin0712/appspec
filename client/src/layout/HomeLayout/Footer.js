import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LogoSection from 'components/logo';
import { Link, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import TextWithIcon from 'layout/HomeLayout/TextWithIcon';

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: theme.palette.secondary.light }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} width="80%" sx={{ py: '30px' }} spacing={2}>
          <Stack width={{ xs: '100%', sm: '70%' }} spacing={3}>
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
          </Stack>
          <Box width={{ xs: '100%', sm: '30%' }}>
            <Stack>
              <Typography variant="h4" gutterBottom>
                Liên kết
              </Typography>
              <Stack spacing={0.5}>
                <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href="http://sgu.edu.vn/">
                  Trường đại học Sài Gòn
                </Link>
                <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href="http://fit.sgu.edu.vn/">
                  Khoa công nghệ thông tin
                </Link>
                <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href="http://thongtindaotao.sgu.edu.vn/">
                  Thông tin đào tạo
                </Link>
                <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href="http://daotao.sgu.edu.vn/">
                  Phòng đào tạo
                </Link>
                <Link fontSize="15px" color="black" fontWeight="500" rel="referrer" href="http://ctsv.sgu.edu.vn/">
                  Phòng công tác sinh viên
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ backgroundColor: theme.palette.primary.darker, py: '20px' }}>
        <Typography color="white" fontSize="16px" fontWeight="400" textAlign="center">
          Bản quyền thuộc về Khoa Công nghệ thông tin - Trường Đại học Sài Gòn
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
