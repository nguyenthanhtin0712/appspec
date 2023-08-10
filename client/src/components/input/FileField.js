import { FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React, { memo, useRef } from 'react';
import PublishIcon from '@mui/icons-material/Publish';

const FileField = ({
  id,
  name,
  label,
  placeholder,
  value,
  error,
  helperText,
  setFieldValue,
  accept,
  setFieldTouched,
  multiple = false
}) => {
  const fileInputRef = useRef(null);
  const handleInputLabelClick = () => {
    fileInputRef.current.click();
  };
  return (
    <Stack spacing={1} sx={{ mb: '10px' }}>
      <InputLabel onClick={handleInputLabelClick}>{label}</InputLabel>
      <OutlinedInput
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            cursor: 'pointer',
            caretColor: 'transparent'
          }
        }}
        autoComplete="off"
        value={value ? value.map((item) => item.name) : ''}
        error={error}
        onBlur={() => setFieldTouched(name, true)}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton component="span" aria-label="upload" sx={{ p: '0' }}>
              <PublishIcon />
            </IconButton>
          </InputAdornment>
        }
        onClick={() => {
          handleInputLabelClick();
        }}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
      <input
        id={id}
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files);
          setFieldValue(name, selectedFiles);
        }}
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
      />
    </Stack>
  );
};

export default memo(FileField);
