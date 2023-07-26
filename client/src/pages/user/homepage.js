import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// import { useTheme } from '@mui/material/styles';

import BannerSection from 'sections/user/homepage/Banner';
import FeatureContainer from 'sections/user/homepage/FeatureContainer';

const HomePage = () => {
  return (
    <>
      <BannerSection />
      <Box component={Container} sx={{ p: 3, pt: 0, mt: 4 }}>
        <FeatureContainer />
      </Box>
    </>
  );
};

export default HomePage;
