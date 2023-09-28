import React from 'react';
import { Code, FolderOpen, Warning2, Refresh2, Profile2User, PathTool } from 'iconsax-react';
import FeatureItem from './FeatureItem';
import { Container, Grid } from '@mui/material';

const arrFeature = [
  { id: 1, name: 'Đăng ký chuyên ngành', href: '/register_speciality', icon: <Code variant="Bulk" /> },
  { id: 2, name: 'Đăng ký thực tập', href: '/admin', icon: <Profile2User variant="Bulk" /> },
  { id: 3, name: 'Đăng ký học cải thiện', href: '/', icon: <Refresh2 variant="Bulk" /> },
  { id: 4, name: 'Xem môn sắp mở', href: '/subject-schedule', icon: <FolderOpen variant="Bulk" /> },
  { id: 5, name: 'Tuyển thực tập sinh', href: '/', icon: <PathTool variant="Bulk" /> },
  { id: 6, name: 'Xem danh sách thôi học', href: '/', icon: <Warning2 variant="Bulk" /> }
];

const FeatureContainer = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2} mt={2}>
        {arrFeature.map((item) => (
          <FeatureItem key={item.id} name={item.name} href={item.href} icon={item.icon} />
        ))}
      </Grid>
    </Container>
  );
};

export default FeatureContainer;
