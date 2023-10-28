import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setPagination } from 'store/slices/warnedStudentDetailSlice';
import { dispatch } from 'store/index';
import { useParams } from 'react-router';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import useDebounce from 'hooks/useDebounce';

const WarnedStudentDetailTable = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { data, isError, isLoading, isRefetching, rowCount, pagination, filterTable } = useSelector((state) => state.warned_student_detail);
  const { majorId, studentCourse, studentQuery } = filterTable;
  const queryDebounce = useDebounce(studentQuery, 500);

  useEffect(() => {
    dispatch(fetchData({ id, majorId, studentCourse, queryDebounce, pagination }));
  }, [id, majorId, pagination, queryDebounce, studentCourse]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'student_code',
        header: 'Mã sinh viên',
        size: 5
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ lót'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên',
        size: 5
      },
      {
        accessorKey: 'user_birthday',
        header: 'Ngày sinh',
        Cell: ({ cell }) => formatDDMMYYYY(cell.getValue()),
        size: 5
      },
      {
        accessorKey: 'student_year',
        header: 'Năm',
        size: 5
      },
      {
        accessorKey: 'student_semester',
        header: 'HK',
        size: 5
      },
      {
        accessorKey: 'total_warning_count',
        header: 'Số lần CB',
        size: 5
      },
      {
        accessorKey: 'semester_gpa',
        header: 'ĐTBCHK',
        Cell: ({ cell }) => cell.getValue().toFixed(2),
        size: 5
      },
      {
        accessorKey: 'cumulative_gpa',
        header: 'ĐTBCTL',
        Cell: ({ cell }) => cell.getValue().toFixed(2),
        size: 5
      },
      {
        accessorKey: 'result',
        header: 'KQ',
        size: 5
      }
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.student_code}
        manualPagination
        enableColumnActions={false}
        enableColumnFilters={false}
        enableSorting={false}
        enableTopToolbar={false}
        onPaginationChange={(updater) => dispatch(setPagination(updater(pagination)))}
        rowCount={rowCount}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching
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
      />
    </>
  );
};

export default memo(WarnedStudentDetailTable);
