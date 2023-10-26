/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

const validStudent = (studentCode) => {
  const regex = /^31\d{2}(41|56)\d{4}$/;
  return !isNaN(studentCode) && regex.test(studentCode);
};

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
          let dataFormated = [];
          workbook.SheetNames.forEach((sheetName) => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            sheetData?.forEach((item) => {
              const arVl = Object.values(item);
              if (validStudent(arVl[1])) {
                if (arVl.length === 10) arVl.splice(2, 1);
                if (arVl.length === 11) arVl.splice(2, 2);

                const obj = {
                  student_id: arVl[1],
                  student_year: arVl[3],
                  student_semester: arVl[4],
                  total_warning_count: arVl[5],
                  term_GPA: arVl[6],
                  cumulative_GPA: arVl[7],
                  result: arVl[8]
                };
                dataFormated.push(obj);
              }
            });
          });

          setExcelData(dataFormated);
        } catch (error) {
          console.error('Error reading Excel file:', error);
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
