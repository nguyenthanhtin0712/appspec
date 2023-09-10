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
  deleteStudent,
  setStudentFileDialog,
  setStudentScoreDialog
} from 'store/reducers/studentSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { Export, Import } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';
import { useCallback } from 'react';
import StudentFileDialog from 'sections/admin/student/StudentFileDialog';
import StudentScoreDialog from 'sections/admin/student/StudentScoreDialog';
import ScoreIcon from '@mui/icons-material/Score';

const StudentTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.student
  );
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  const handleClickOpen = () => {
    dispatch(
      setStudentFileDialog({
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
        accessorKey: 'student_code',
        header: 'MSSV',
        size: 10,
        enableClickToCopy: true
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên',
        size: 10
      },
      {
        accessorKey: 'user_gender',
        header: 'Giới tính',
        size: 10,
        Cell: ({ cell }) => {
          return <div>{cell.row.original.user_gender == 0 ? 'Nam' : 'Nữ'}</div>;
        }
      },
      {
        accessorKey: 'student_score',
        header: 'Điểm',
        size: 10,
        Cell: ({ cell }) => {
          if (cell.row.original && cell.row.original.student_score !== null && typeof cell.row.original.student_score === 'number') {
            return <div>{cell.row.original.student_score.toFixed(2)}</div>;
          } else {
            return <div>N/A</div>;
          }
        }
      },
      {
        accessorKey: 'user_birthday',
        header: 'Ngày sinh',
        size: 10
      },
      {
        accessorKey: 'student_class',
        header: 'Lớp',
        size: 10
      },
      {
        accessorKey: 'major_name',
        header: 'Ngành'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

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
                  return handleDelete(row.original.user_id);
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
            <Box marginLeft={2}>
              <Button
                color="primary"
                onClick={() => {
                  dispatch(
                    setStudentScoreDialog({
                      open: true,
                      initValue: {
                        file_student: '',
                        password_student: ''
                      }
                    })
                  );
                }}
                startIcon={<ScoreIcon />}
                variant="contained"
                component="span"
              >
                Thêm điểm
              </Button>
            </Box>
          </Box>
        )}
      />
      <ConfirmDialog
        open={openCofirm}
        onClose={handleCloseCofirm}
        title="Xoá sinh viên"
        content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await dispatch(deleteStudent(idDelete));
                handleCloseCofirm();
                toast.success('Xóa sinh viên thành công!');
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
      <StudentFileDialog />
      <StudentScoreDialog />
    </>
  );
};

export default memo(StudentTable);
