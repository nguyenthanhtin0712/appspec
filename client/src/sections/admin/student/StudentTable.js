import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Trash } from 'iconsax-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteStudent,
  setStudentDialog
} from '../../../store/reducers/student';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { Export, Import } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import { useCallback } from 'react';

const SpecialtyTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.student
  );
  console.log("🚀 ~ file: StudentTable.js:29 ~ SpecialtyTable ~ data:", data)
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  const handleExportData = useCallback(() => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);

    // Calculate optimal column widths based on column names and data length
    const columnWidths = [];

    // Calculate column widths based on column names
    Object.keys(data[0]).forEach((key, index) => {
      const columnName = key !== null ? key.toString() : '';
      const columnNameLength = columnName.length;
      columnWidths[index] = Math.max(columnWidths[index] || 0, columnNameLength);
    });

    // Calculate column widths based on data length
    data.forEach((row) => {
      Object.values(row).forEach((cell, index) => {
        const cellValue = cell !== null ? cell.toString() : '';
        const cellLength = cellValue.length;
        columnWidths[index] = Math.max(columnWidths[index] || 0, cellLength);
      });
    });

    // Convert the column widths to Excel-style width units
    const columnWidthsExcel = columnWidths.map((width) => ({
      width: width + 2 // Adding some extra padding for better readability
    }));

    // Apply the calculated column widths to the worksheet
    ws['!cols'] = columnWidthsExcel;

    utils.book_append_sheet(wb, ws, 'Major');
    writeFileXLSX(wb, 'Specialty.xlsx');
  }, [data]);

  const handleImportData = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      console.error('Không có file được chọn.');
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[1];
      if (!sheetName) {
        toast.error('Không đúng định dạng.');
        return;
      }
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

      let result = { data: [] };
      jsonData.forEach((row) => {
        result.data.push({
          student_code: row['MaSV'],
          user_firstname: row['HoLotSV'],
          user_lastname: row['TenSV'],
          user_birthday: row['NgaySinhC'],
          user_gender: row['Phai'],
          student_course: row['KhoaHoc'],
          student_class: row['MaLop'],
          major_code: row['MaNganh']
        });
      });
      console.log(result);
    };
  };

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'user_id',
        header: 'ID'
      },
      {
        accessorKey: 'student_code',
        header: 'MSSV'
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên'
      },
      {
        accessorKey: 'user_gender',
        header: 'Giới tính'
      },
      {
        accessorKey: 'user_birthday',
        header: 'Ngày sinh'
      },
      {
        accessorKey: 'student_class',
        header: 'Lớp'
      },
      {
        accessorKey: 'major_name',
        header: 'Ngành'
      },
      {
        accessorKey: 'student_course',
        header: 'Khóa'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

  const handleUpdate = (data) => {
    dispatch(setStudentDialog({ open: true, action: 'update', initValue: data }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.specialty_id}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={isError ? { color: 'error', children: 'Error loading data' } : undefined}
        onColumnFiltersChange={(updater) => dispatch(setColumnFilters(updater(columnFilters)))}
        onGlobalFilterChange={(filter) => dispatch(setGlobalFilter(filter))}
        onPaginationChange={(updater) => dispatch(setPagination(updater(pagination)))}
        onSortingChange={(updater) => dispatch(setSorting(updater(sorting)))}
        rowCount={rowCount}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting
        }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => {
          return (
            <Box sx={{ display: 'flex' }}>
              <IconButton
                onClick={() => {
                  handleUpdate(row.original);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(row.id)}>
                <Trash />
              </IconButton>
            </Box>
          );
        }}
        muiTablePaperProps={{
          elevation: 0,
          variant: 'outlined',
          sx: {
            border: '1px solid',
            borderRadius: 1.5,
            borderColor: theme.palette.divider,
            boxShadow: theme.customShadows.z2,
            overflow: 'hidden'
          }
        }}
        muiTableHeadCellProps={{
          sx: (theme) => ({
            bgcolor: theme.palette.background.neutral
          })
        }}
        renderTopToolbarCustomActions={() => (
          <Box display="flex" alignItems="center">
            <Button color="primary" onClick={handleExportData} startIcon={<Export />} variant="contained">
              Xuất Excel
            </Button>
            <Box marginLeft={2}>
              <input id="fileInput" type="file" style={{ display: 'none' }} accept=".xlsx" onChange={handleImportData} />
              <label htmlFor="fileInput">
                <Button color="primary" startIcon={<Import />} variant="contained" component="span">
                  Nhập Excel
                </Button>
              </label>
            </Box>
          </Box>
        )}
      />
      <ConfirmDialog
        open={openCofirm}
        onClose={handleCloseCofirm}
        title="Delete"
        content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await dispatch(deleteStudent(idDelete));
                handleCloseCofirm();
                toast.success('Xóa chuyên ngành thành công!');
                setIdDelete('');
              } catch (err) {
                console.error(err);
                toast.error('Có lỗi trong quá trình xóa!' + err);
              }
            }}
          >
            Chắc chắn
          </Button>
        }
      />
    </>
  );
};

export default memo(SpecialtyTable);
