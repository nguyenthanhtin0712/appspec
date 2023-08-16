import { dispatch } from 'store';
import { getExportData } from 'store/reducers/registerSpecialtyUserSlice';
import ExcelJS from 'exceljs';

const chunkArray = (myArray, chunk_size) => {
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
};

export async function ExportResultRegisterSpecialty(registerspecialtyid, major_id) {
  const response = await dispatch(getExportData({ register_specialty_id: registerspecialtyid, major_id }));
  const { register_specialty_name, specialties } = response.payload.data;
  const wb = new ExcelJS.Workbook();
  const fileName = `${register_specialty_name + '_' + major_id}.xlsx`;

  specialties.forEach((specialty) => {
    const student_length = specialty.students.length;
    const ws = wb.addWorksheet(specialty.specialty_id);
    ws.properties.defaultRowHeight = 23;
    const columnWidths = [5, 12, 20, 7, 10, 5, 12, 20, 7];

    columnWidths.forEach((width, index) => {
      ws.getColumn(index + 1).width = width;
    });

    const r1 = ws.addRow(['KHOA CÔNG NGHỆ THÔNG TIN']);
    r1.style.alignment = { vertical: 'middle', horizontal: 'center' };
    r1.style.font = { size: 16 };

    const r2 = ws.addRow(['DANH SÁCH SINH VIÊN']);
    r2.style.alignment = { vertical: 'middle', horizontal: 'center' };
    r2.style.font = { bold: true, size: 16 };

    const r3 = ws.addRow([`CHUYÊN NGÀNH ${specialty.specialty_name.toUpperCase()}`]);
    r3.style.alignment = { vertical: 'middle', horizontal: 'center' };
    r3.style.font = { bold: true, size: 16 };

    ws.mergeCells('A1:I1');
    ws.mergeCells('A2:I2');
    ws.mergeCells('A3:I3');

    ws.addRow([]);

    let onePage = chunkArray(specialty.students, 100);
    let stt = 1;
    for (let i = 0; i < onePage.length; i++) {
      let col = chunkArray(onePage[i], Math.ceil(onePage[i].length / 2));
      const r_header = ws.addRow(['STT', 'MSSV', 'HỌ VÀ TÊN LÓT', 'TÊN', '', 'STT', 'MSSV', 'HỌ VÀ TÊN LÓT', 'TÊN']);
      for (let i = 1; i <= 9; i++) {
        if (i != 5) {
          r_header.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          r_header.getCell(i).style.alignment = { vertical: 'middle', horizontal: 'center' };
          r_header.getCell(i).style.font = { bold: true, size: 11 };
        }
      }

      const col_length = col[0].length;
      for (let j = 0; j < col_length; j++) {
        col[1] = col[1] ?? [];
        const r_student = ws.addRow([
          stt,
          col[0] && col[0][j] ? col[0][j].student_code : '',
          col[0] && col[0][j] ? col[0][j].user_firstname : '',
          col[0] && col[0][j] ? col[0][j].user_lastname : '',
          '',
          col[1] && col[1][j] ? stt + col_length : '',
          col[1] && col[1][j] ? col[1][j].student_code : '',
          col[1] && col[1][j] ? col[1][j].user_firstname : '',
          col[1] && col[1][j] ? col[1][j].user_lastname : ''
        ]);
        r_student.getCell(1).alignment = { horizontal: 'center' };
        r_student.getCell(6).alignment = { horizontal: 'center' };
        for (let i = 1; i <= 9; i++) {
          if (i >= 6 && !col[1][j]) break;
          if (i != 5) {
            r_student.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          }
        }
        stt += 1;
      }
      stt += 50;
    }

    ws.addRow([]);
    ws.addRow([`(Danh sách có ${student_length} sinh viên)`]);
    ws.addRow([]);
    ws.addRow([]);

    const r_kyten = ws.addRow([]);
    r_kyten.getCell(7).value = 'Trưởng Khoa CNTT';
    r_kyten.getCell(7).style.alignment = { vertical: 'middle', horizontal: 'center' };
    r_kyten.getCell(7).style.font = { bold: true, size: 11 };
    ws.mergeCells(`G${r_kyten.number}:I${r_kyten.number}`);
  });

  wb.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  });
}
