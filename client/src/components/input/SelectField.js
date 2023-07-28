import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

const SelectField = ({
  id,
  labelId,
  label,
  value,
  name,
  onBlur,
  onChange,
  error,
  helperText,
  list,
  itemValue,
  itemText,
  fullWidth,
  ...props
}) => {
  const memoizedOptions = React.useMemo(
    () =>
      list &&
      list.length > 0 &&
      list.map((item) => (
        <MenuItem key={item[itemValue]} value={item[itemValue]}>
          {item[itemText]}
        </MenuItem>
      )),
    [itemText, itemValue, list]
  );

  return (
    <Stack spacing={1}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name ? name : id}
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        fullWidth={fullWidth}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        error={error}
        {...props}
      >
        <MenuItem value="" sx={{ color: 'text.secondary' }}>
          {label}
        </MenuItem>
        {memoizedOptions}
      </Select>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default SelectField;
