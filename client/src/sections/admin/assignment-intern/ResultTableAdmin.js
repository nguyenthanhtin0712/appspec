import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setStatus,
  setDialog
} from 'store/reducers/assignmentIntenship';
import { dispatch } from 'store/index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import JobholderDialog from 'sections/admin/assignment-intern/JobholderDialog';
import AssignmentInternDialog from 'sections/admin/assignment-intern/AssignmentInternDialog';

const ResultTable = () => {
  const theme = useTheme();
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    rowCount,
    columnFilters,
    globalFilter,
    sorting,
    pagination,
    status,
    assignment_intern_id
  } = useSelector((state) => state.assignment_internship);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id }));
  }, [columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id]);

  const columns = React.useMemo(
    () => [
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
        accessorKey: 'jobholder_name',
        header: 'Giảng viên',
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : 'Chưa phân công'),
        filterVariant: 'select'
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
        enableRowSelection
        onRowSelectionChange={setRowSelection}
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
          sorting,
          rowSelection
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
        renderTopToolbarCustomActions={({ table }) => (
          <Box>
            {!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() ? (
              <Select
                id="register-status"
                onChange={(e) => dispatch(setStatus(e.target.value))}
                size="small"
                value={status}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" sx={{ color: 'text.secondary' }}>
                  Tất cả
                </MenuItem>
                <MenuItem value={1}>Đã phân công</MenuItem>
                <MenuItem value={2}>Chưa phân công</MenuItem>
              </Select>
            ) : (
              <Button
                onClick={() => {
                  dispatch(setDialog(true));
                }}
                variant="contained"
              >
                Phân công
              </Button>
            )}
          </Box>
        )}
      />
      <JobholderDialog></JobholderDialog>
      <AssignmentInternDialog rowSelection={rowSelection} setRowSelection={setRowSelection} />
    </>
  );
};

export default memo(ResultTable);
