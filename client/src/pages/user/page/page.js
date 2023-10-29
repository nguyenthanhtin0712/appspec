import React from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import MarkdownIt from 'markdown-it';
import { useSelector } from 'react-redux';
import 'pages/user/page/markdown.css';
import { useTheme } from '@mui/material';
import { formatDDMMYYYY } from 'utils/formatDateTime';

const UserPage = () => {
  const theme = useTheme();
  const { page_title, page_content, updated_at } = useSelector((state) => state.page.viewData);
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
        <Typography
          variant="h2"
          component="h1"
          sx={{
            position: 'relative',
            mb: 2,
            fontWeight: 600,
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '-5px',
              background: theme.palette.primary.main,
              width: '40px',
              height: '3px'
            }
          }}
        >
          {page_title}
        </Typography>
        <Typography mb={2} fontStyle="italic">
          Cập nhật lần cuối {formatDDMMYYYY(updated_at)}
        </Typography>
        {<div className="markdown-body" dangerouslySetInnerHTML={{ __html: result }} />}
      </MainCard>
    </Container>
  );
};

export default UserPage;
