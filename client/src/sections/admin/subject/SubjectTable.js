/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Trash, Export } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setSubjectDialog,
  setIdDeleteSubject,
  setOpenCofirmDialog
} from 'store/slices/subjectSlice';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';

const SubjectTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.subject
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'subject_id',
        header: 'Mã HP',
        size: 3
      },
      {
        accessorKey: 'subject_name',
        header: 'Tên HP',
        size: 230
      },
      {
        accessorKey: 'subject_credit',
        header: 'Số TC',
        size: 4
      },
      {
        accessorKey: 'subject_LT',
        header: 'Tiết LT',
        size: 4
      },
      {
        accessorKey: 'subject_TH',
        header: 'Tiết TH',
        size: 4
      },
      {
        accessorKey: 'subject_BT',
        header: 'Tiết BT',
        size: 2
      },
      {
        accessorKey: 'academic_field_id',
        header: 'Bộ môn',
        size: 2
      }
    ],
    []
  );

  const handleDelete = (id) => {
    dispatch(setIdDeleteSubject(id));
    dispatch(setOpenCofirmDialog(true));
  };

  const handleUpdate = (data) => {
    dispatch(setSubjectDialog({ open: true, action: 'update', initValue: data }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.subject_id}
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
        renderRowActions={({ row }) => (
          <Stack direction="row">
            <IconButton onClick={() => handleUpdate(row.original)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.id)}>
              <Trash />
            </IconButton>
          </Stack>
        )}
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
          <Button color="success" startIcon={<Export />} variant="contained">
            Xuất Excel
          </Button>
        )}
      />
    </>
  );
};

export default memo(SubjectTable);
