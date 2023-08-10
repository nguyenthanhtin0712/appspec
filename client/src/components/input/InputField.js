import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const InputField = ({
  id,
  type = 'text',
  label,
  value,
  name,
  onBlur,
  onChange,
  placeholder,
  fullWidth = true,
  error,
  helperText,
  ...props
}) => (
  <Stack spacing={1}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      type={type}
      value={value}
      name={name ? name : id}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      error={error}
      {...props}
    />
    {error && <FormHelperText error>{helperText}</FormHelperText>}
  </Stack>
);

export default InputField;
