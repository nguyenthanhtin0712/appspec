import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

const SelectField = ({ id, labelId, label, value, name, error, helperText, list, getOptionLabel, getOptionValue, ...props }) => {
  const memoizedOptions = React.useMemo(
    () =>
      list &&
      list.length > 0 &&
      list.map((item) => (
        <MenuItem key={getOptionValue ? getOptionValue(item) : item} value={getOptionValue ? getOptionValue(item) : item}>
          {getOptionLabel ? getOptionLabel(item) : item}
        </MenuItem>
      )),
    [getOptionLabel, getOptionValue, list]
  );

  return (
    <Stack spacing={1}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        name={name || id}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        error={error}
        {...props}
      >
        <MenuItem value="" sx={{ color: 'text.secondary' }}>
          {`Chọn ${label}`}
        </MenuItem>
        {memoizedOptions}
      </Select>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default SelectField;
