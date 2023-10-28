import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const GradingInput = () => {
  const [inputValue, setInputValue] = useState('');

  // Hàm xử lý khi giá trị thay đổi
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Kiểm tra nếu giá trị không phải là số hoặc nằm ngoài khoảng từ 0 đến 10
    if (isNaN(value) || value < 0 || value > 10) {
      // Xoá giá trị không hợp lệ
      setInputValue('');
    } else {
      // Cập nhật giá trị hợp lệ
      setInputValue(value);
    }
  };

  return (
    <TextField
      label="Điểm số"
      variant="outlined"
      value={inputValue}
      onChange={handleInputChange}
      type="number"
      inputProps={{ min: 0, max: 10 }}
    />
  );
};

export default GradingInput;
