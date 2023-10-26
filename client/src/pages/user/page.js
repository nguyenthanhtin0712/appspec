import React from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import MarkdownIt from 'markdown-it';
import { useSelector } from 'react-redux';

const UserPage = () => {
  const { page_title, page_content } = useSelector((state) => state.page.viewData);
  const mdParser = new MarkdownIt();
  const result = mdParser.render(page_content);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit" href="/page">
            Page
          </Link>
          <Typography color="text.primary">{page_title}</Typography>
        </Breadcrumbs>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
          {page_title}
        </Typography>
        {<div dangerouslySetInnerHTML={{ __html: result }} />}
      </MainCard>
    </Container>
  );
};

export default UserPage;
