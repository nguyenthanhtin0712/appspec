import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { dispatch } from 'store';
import { getExportData } from 'store/reducers/registerSpecialtyUserSlice';
import { utils, writeFileXLSX } from 'xlsx';

const chunkArray = (myArray, chunk_size) => {
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
};

const TestExport = () => {
  const [data, setData] = useState(null);
  const divRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(
        getExportData({
          register_specialty_id: 1,
          specialty_id: 'KTPM'
        })
      );
      setData(res.payload.data);
    };
    fetchData();
  }, []);

  const handleExport = () => {
    if (!data) return;
    const wb = utils.book_new();
    const ws = utils.table_to_sheet(divRef.current.querySelector('table'));

    // Đặt độ rộng cho từng cột
    const columnWidths = [
      { wpx: 35 },
      { wpx: 80 },
      { wpx: 130 },
      { wpx: 50 },
      { wpx: 70 },
      { wpx: 35 },
      { wpx: 80 },
      { wpx: 130 },
      { wpx: 50 }
    ];

    ws['!cols'] = columnWidths;

    utils.book_append_sheet(wb, ws, 'Exported Data');

    writeFileXLSX(wb, 'exported_data.xlsx');
  };

  if (!data) return null;

  let onePage = chunkArray(data, 100);
  let html = `<table><tbody>
    <tr><td align ="center" colspan="9">KHOA CÔNG NGHỆ THÔNG TIN</td></tr>
    <tr><td align ="center" colspan="9">DANH SÁCH SINH VIÊN KHÓA</td></tr>
    <tr><td align ="center" colspan="9">CHUYÊN NGÀNH KỸ THUẬT PHẦN MỀM</td></tr>
    <tr><td align ="center" colspan="9"></td></tr>
  `;
  let stt = 1;
  for (let i = 0; i < onePage.length; i++) {
    let col = chunkArray(onePage[i], Math.ceil(onePage[i].length / 2));
    const col_length = col[0].length;
    html += `<tr>
    <td>STT</td>
    <td>MSSV</td>
    <td>HỌ VÀ TÊN LÓT</td>
    <td>TÊN</td>
    <td></td>
    <td>STT</td>
    <td>MSSV</td>
    <td>HỌ VÀ TÊN LÓT</td>
    <td>TÊN</td>
  </tr>`;
    for (let j = 0; j < col_length; j++) {
      html += `</tr><td>${stt}</td>
        <td>${col[0][j].student_code}</td>
        <td>${col[0][j].user_firstname}</td>
        <td>${col[0][j].user_lastname}</td>
        <td></td>
        <td>${col[1][j] ? stt + 50 : ''}</td>
        <td>${col[1][j] ? col[1][j].student_code : ''}</td>
        <td>${col[1][j] ? col[1][j].user_firstname : ''}</td>
        <td>${col[1][j] ? col[1][j].user_lastname : ''}</td>
        </tr>`;
      stt += 1;
    }
  }
  html += `</tbody></table>`;

  return (
    <>
      <Button onClick={handleExport} variant="contained">
        Export
      </Button>
      <div ref={divRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default TestExport;
