import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination } from 'store/reducers/assignmentInternshipDetail';
import { dispatch } from 'store/index';

const GradingUpdateTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination, id } = useSelector(
    (state) => state.assignment_internship_detail
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, id }));
  }, [columnFilters, globalFilter, sorting, pagination, id]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'student_code',
        header: 'MSSV'
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ lót',
        size: 10
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên',
        size: 10
      },
      {
        accessorKey: 'company_name',
        header: 'Công ty'
      },
      {
        accessorKey: 'position_name',
        header: 'Vị trí'
      },
      {
        accessorKey: 'mentor_name',
        header: 'Người hướng dẫn',
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : 'Chưa bổ sung')
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
        manualFiltering
        manualPagination
        manualSorting
        enableHiding={false}
        enableFullScreenToggle={false}
        enableFilters={false}
        enableDensityToggle={false}
        muiToolbarAlertBannerProps={isError ? { color: 'error', children: 'Error loading data' } : null}
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
        positionGlobalFilter="right"
        initialState={{
          showGlobalFilter: true
        }}
        muiSearchTextFieldProps={{
          placeholder: 'Mã sinh viên, họ tên, ...',
          sx: { minWidth: '250px' },
          variant: 'outlined',
          size: 'small'
        }}
        positionToolbarAlertBanner="bottom"
      />
    </>
  );
};

export default memo(GradingUpdateTable);
