import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          console.log(sheetData);

          const dataSlice = sheetData?.slice(6, -4);
          let dataFormated = [];

          dataSlice?.forEach((item) => {
            dataFormated.push(Object.values(item)[1]);
          });

          setExcelData(dataFormated);
        } catch (error) {
          console.error('Error reading Excel file:', error);
          // Handle the error gracefully, e.g., show an error message to the user.
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);

  console.log(excelData);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelReader;
