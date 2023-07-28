import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTimePickerField = ({ id, label, error, helperText, ...props }) => {
  return (
    <Stack spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <DateTimePicker id={id} closeOnSelect={false} {...props} />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default DateTimePickerField;
