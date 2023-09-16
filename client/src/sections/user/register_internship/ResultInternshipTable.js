import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';

const ResultInternshipTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.regsiter_intern_user
  );

  console.log('data', data);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
    };
    fetch();
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'student_code',
        header: 'Mã sinh viên',
        size: 5
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ lót',
        size: 12
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên',
        size: 5
      },
      {
        accessorKey: 'company_name',
        header: 'Công ty'
      },
      {
        accessorKey: 'position_name',
        header: 'Vị trí'
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

export default memo(ResultInternshipTable);
