import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Banner from '../../../assets/images/banner-2.jpg';
import { useTheme } from '@mui/material';

const BannerSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '500px',
        [theme.breakpoints.down('md')]: {
          height: '300px'
        },
        background: `url(${Banner}) 50% no-repeat`,
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: '#122153',
          opacity: 0.55,
          filter: 'alpha((opacity = 55))'
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontSize: 43,
            fontWeight: 600,
            letterSpacing: '2px',
            position: 'relative',
            [theme.breakpoints.down('md')]: {
              fontSize: 30
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              background: 'white',
              width: '170px',
              height: '2px'
            }
          }}
          gutterBottom
        >
          TRƯỜNG ĐẠI HỌC SÀI GÒN
        </Typography>
        <Typography
          sx={{
            fontSize: '22px',
            [theme.breakpoints.down('md')]: {
              fontSize: 16
            }
          }}
        >
          KHOA CÔNG NGHỆ THÔNG TIN
        </Typography>
      </Box>
    </Box>
  );
};

export default BannerSection;
