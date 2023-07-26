import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const InputField = ({ id, type, value, name, onBlur, onChange, placeholder, fullWidth, error, helperText }) => (
  <Stack spacing={1}>
    <InputLabel htmlFor={id}>{placeholder}</InputLabel>
    <OutlinedInput
      id={id}
      type={type}
      value={value}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      error={error}
    />
    {error && <FormHelperText error>{helperText}</FormHelperText>}
  </Stack>
);

export default InputField;
