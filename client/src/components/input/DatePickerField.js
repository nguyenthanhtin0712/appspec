import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerField = ({ id, label, error, helperText, setFieldTouched, setFieldValue, setFieldError, ...props }) => {
  return (
    <Stack spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <DatePicker
        id={id}
        closeOnSelect={false}
        slotProps={{
          textField: {
            error: error,
            onBlur: () => setFieldTouched(id, true)
          }
        }}
        onClose={() => setFieldTouched(id, true)}
        onChange={(value) => setFieldValue(id, value)}
        onError={(newError) => setFieldError(id, newError)}
        {...props}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default DatePickerField;
