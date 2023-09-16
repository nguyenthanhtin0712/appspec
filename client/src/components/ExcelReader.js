import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        setExcelData(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  console.log(excelData);

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xlsx" />
      {excelData && (
        <table>
          <thead>
            <tr>
              {Object.keys(excelData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExcelReader;
