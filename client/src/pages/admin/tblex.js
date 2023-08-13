import React from 'react';
import ExcelJS from 'exceljs';
import { Button } from '@mui/material';

const ExportExcel = () => {
  const handleExport = () => {
    const ex = new ExcelJS.Workbook();
    console.log(ex);
  };
  return (
    <Button variant="contained" onClick={handleExport}>
      Sinh Pro
    </Button>
  );
};

export default ExportExcel;
