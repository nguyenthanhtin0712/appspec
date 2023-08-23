import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function AsyncAutocompleteField({ id, label, placeholder, options, loading, multiple, fetchOptions, ...props }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (options.length === 0) fetchOptions();
  };

  return (
    <Stack spacing={1}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Autocomplete
        id={id}
        open={open}
        onOpen={handleOpen}
        onClose={() => setOpen(false)}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
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
        multiple={multiple}
        {...props}
      />
    </Stack>
  );
}
