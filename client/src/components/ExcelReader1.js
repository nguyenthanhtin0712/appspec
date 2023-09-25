import React, { useState } from 'react';
import ExcelJS from 'exceljs';

function ExcelReader() {
  const [data, setData] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target.result;

      await workbook.xlsx.load(data);

      const sheet = workbook.getWorksheet(1); // Lấy trang tính toán đầu tiên

      if (!sheet) {
        console.error('Sheet not found or is undefined.');
        return;
      }

      const rows = [];
      sheet.eachRow((row) => {
        rows.push(row.values);
      });

      setData(rows);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelReader;
