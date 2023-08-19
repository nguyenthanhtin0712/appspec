import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllSubject } from 'store/reducers/subjectSlice';
import { dispatch } from 'store';

export default function AsyncAutocomplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) return undefined;

    const fetchData = async () => {
      const filmData = await dispatch(getAllSubject());
      const data = filmData.payload.data.result;
      if (active) setOptions(data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <Stack spacing={1}>
      <InputLabel htmlFor="asynchronous-demo">Môn học trước</InputLabel>
      <Autocomplete
        multiple
        id="asynchronous-demo"
        open={open}
        value={selectedValue}
        onChange={handleAutocompleteChange}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option.subject_id === value.subject_id}
        getOptionLabel={(option) => `${option.subject_id} - ${option.subject_name}`}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Chọn môn học trước"
            InputProps={{
              'aria-label': 'Without label',
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </Stack>
  );
}
