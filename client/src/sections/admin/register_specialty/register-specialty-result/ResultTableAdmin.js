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
  setStatus
} from 'store/reducers/registerSpecialtyUserSlice';
import { dispatch } from 'store/index';
import { Box, Button, MenuItem, Select } from '@mui/material';
import ChangeSpecialtyDialog from 'sections/admin/register_specialty/register-specialty-result/ChangeSpecialtyDialog';

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
    registerSpecialtyId,
    majorId,
    status,
    statistic
  } = useSelector((state) => state.register_specialty_user);
  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, majorId, registerSpecialtyId, status }));
  }, [columnFilters, globalFilter, sorting, pagination, majorId, registerSpecialtyId, status]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'student_code',
        header: 'Mã sinh viên',
        size: 10
      },
      {
        accessorKey: 'user_firstname',
        header: 'Họ lót'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Tên',
        size: 10
      },
      {
        accessorKey: 'student_score',
        header: 'Điểm',
        size: 10,
        Cell: ({ cell }) => cell.getValue().toFixed(2)
      },
      {
        accessorKey: 'specialty_name',
        header: 'Chuyên ngành',
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : 'Chưa đăng ký'),
        filterVariant: 'select',
        filterSelectOptions: statistic.map((item) => item.specialty_name),
        size: 10
      }
    ],
    [statistic]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.student_code}
        enableRowNumbers
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        manualFiltering
        manualPagination
        manualSorting
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
                <MenuItem value={1}>Đã đăng ký</MenuItem>
                <MenuItem value={2}>Chưa đăng ký</MenuItem>
              </Select>
            ) : (
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                variant="contained"
              >
                Đổi chuyên ngành
              </Button>
            )}
          </Box>
        )}
      />
      <ChangeSpecialtyDialog open={open} handleClose={handleClose} rowSelection={rowSelection} setRowSelection={setRowSelection} />
    </>
  );
};

export default memo(ResultTable);
