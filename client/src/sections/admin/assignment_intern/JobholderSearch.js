// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
// project-imports
import MainCard from 'components/MainCard';

// assets
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

// =========================|| DATA WIDGET - ADD NEW TASK ||========================= //

const JobholderSearch = () => {
  const [text, setText] = useState('');

  const handleClearText = () => {
    setText('');
  };
  return (
    <MainCard title="Danh sách giảng viên">
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton style={{ padding: '2px' }}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: text && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearText} style={{ padding: '2px' }}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Hoàng Gia Bảo" />
            </ListItemButton>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemText primary="Nguyễn Thanh Sang" />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default JobholderSearch;
