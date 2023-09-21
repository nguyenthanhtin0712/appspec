import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import JobholderSearchItem from 'sections/admin/assignment_intern/JobholderSearchItem';
import useDebounce from 'hooks/useDebounce';
import { dispatch } from 'store/index';
import { fetchJobholder } from 'store/reducers/assignmentIntenship';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

const JobholderSearch = () => {
  const [text, setText] = useState('');

  const { assignment_intern_id, jobholder_search, jobholderSearch_isLoading } = useSelector((state) => state.assignment_internship);
  const handleClearText = () => {
    setText('');
  };

  const queryDebounce = useDebounce(text, 500);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchJobholder({ id: assignment_intern_id, query: queryDebounce }));
    };
    fetchData();
  }, [queryDebounce, assignment_intern_id]);

  return (
    <MainCard title="Danh sách giảng viên" style={{ height: '100%' }}>
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
                    <IconButton>
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
            {jobholderSearch_isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              jobholder_search.length > 0 &&
              jobholder_search.map((jobholder) => (
                <JobholderSearchItem
                  key={jobholder.jobholder_code}
                  jobholder_code={jobholder.jobholder_code}
                  id={assignment_intern_id}
                  name={jobholder.jobholder_name}
                  join={jobholder.jobholderJoinInternship}
                />
              ))
            )}
          </List>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default JobholderSearch;
