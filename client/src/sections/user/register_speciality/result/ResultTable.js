import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination } from 'store/reducers/registerSpecialtyUserSlice';
import { dispatch } from 'store/index';
import { formatDateTimeDisplay } from 'utils/formatDateTime';

const ResultTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination, majorId } = useSelector(
    (state) => state.register_specialty_user
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, majorId }));
    };
    if (majorId) fetch();
  }, [columnFilters, globalFilter, sorting, pagination, majorId]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'student_code',
        header: 'Mã sinh viên'
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ lót'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên'
      },
      {
        accessorKey: 'student_score',
        header: 'Điểm',
        Cell: ({ cell }) => cell.getValue().toFixed(2)
      },
      {
        accessorKey: 'specialty_name',
        header: 'Chuyên ngành',
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : 'Chưa đăng ký')
      },
      {
        accessorKey: 'specialty_date',
        header: 'Thời gian đăng ký',
        Cell: ({ cell }) => (cell.getValue() ? formatDateTimeDisplay(cell.getValue()) : 'Chưa đăng ký')
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
        enableRowNumbers
        manualFiltering
        manualPagination
        manualSorting
        enableHiding={false}
        enableFullScreenToggle={false}
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
        positionGlobalFilter="left"
        initialState={{
          showGlobalFilter: true
        }}
        muiSearchTextFieldProps={{
          placeholder: 'Mã sinh viên, họ tên, ...',
          sx: { minWidth: '250px' },
          variant: 'outlined',
          size: 'small'
        }}
      />
    </>
  );
};

export default memo(ResultTable);
