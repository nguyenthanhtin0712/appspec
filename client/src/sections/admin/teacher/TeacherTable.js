import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Trash } from 'iconsax-react';
// import { Edit } from 'iconsax-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteTeacher,
  setTeacherFileDialog
} from 'store/reducers/teacherSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { Export, Import } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';
import { useCallback } from 'react';
import TeacherFileDialog from 'sections/admin/teacher/TeacherDialog';

const TeacherTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.teacher
  );
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  const handleClickOpen = () => {
    dispatch(
      setTeacherFileDialog({
        open: true,
        initValue: {
          file_student: '',
          password_student: ''
        }
      })
    );
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

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'teacher_id',
        header: 'MAGV',
        size: 10
      },
      {
        accessorKey: 'teacher_name',
        header: 'Họ tên'
      },
      {
        accessorKey: 'teacher_email',
        header: 'Email'
      },
      {
        accessorKey: 'teacher_birthday',
        header: 'Ngày sinh',
        size: 10
      },
      {
        accessorKey: 'teacher_phone',
        header: 'Số ĐT',
        size: 15
      },
      {
        accessorKey: 'specialty_name',
        header: 'Chuyên ngành',
        size: 15
      },
      {
        accessorKey: 'teacher_title',
        header: 'Trình độ'
      },
      {
        accessorKey: 'teacher_unit',
        header: 'Đơn vị',
        size: 10
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

  // const handleUpdate = (data) => {
  //   dispatch(setStudentDialog({ open: true, action: 'update', initValue: data }));
  // };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.user_id}
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
              {/* <IconButton
                onClick={() => {
                  handleUpdate(row.original);
                }}
              >
                <Edit />
              </IconButton> */}
              <IconButton
                color="error"
                onClick={() => {
                  return handleDelete(row.original.teacher_id);
                }}
              >
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
              <Button color="primary" onClick={handleClickOpen} startIcon={<Import />} variant="contained" component="span">
                Nhập Excel
              </Button>
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
                await dispatch(deleteTeacher(idDelete));
                handleCloseCofirm();
                toast.success('Xóa giảng viên thành công!');
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
      <TeacherFileDialog />
    </>
  );
};

export default memo(TeacherTable);
