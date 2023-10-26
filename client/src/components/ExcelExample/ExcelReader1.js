import React, { useState } from 'react';
import Excel from 'exceljs';

const validStudent = (studentCode) => {
  const regex = /^31\d{2}(41|56)\d{4}$/;
  return !isNaN(studentCode) && regex.test(studentCode);
};

const ReadFileExcelJS = () => {
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    let dataStudent = [];
    const file = e.target.files[0];
    const wb = new Excel.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then((workbook) => {
        workbook.eachSheet((sheet) => {
          sheet.eachRow((row) => {
            if (validStudent(row.values[2])) {
              dataStudent.push(row.values);
            }
          });
        });
        setData(dataStudent);
      });
    };
  };

  console.log(data);
  // console.log(
  //   data.filter((item) => {
  //     console.log(item[2]);
  //     return item[12]?.richText[0]?.text === 'CC';
  //   })
  // );

  // console.log(
  //   data.filter((item) => {
  //     console.log(item[2]);
  //     return item[12]?.richText[0]?.text === 'BTH';
  //   })
  // );

  return (
    <div>
      <div>Upload Excel File</div>
      <input type="file" onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default ReadFileExcelJS;
