import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Trash } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setOpenCofirmDialog,
  setIdDelete
} from 'store/slices/roleSlice';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Export } from 'iconsax-react';
import { useNavigate } from 'react-router';
import IconAction from 'components/IconAction';
import RoleDeleteDialog from 'sections/admin/role/RoleDeleteDialog';

const RoleTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.role
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã nhóm quyền'
      },
      {
        accessorKey: 'name',
        header: 'Tên nhóm quyền'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    dispatch(setOpenCofirmDialog(true));
    dispatch(setIdDelete(id));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
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
        renderRowActions={({ row }) => (
          <Stack direction="row">
            <IconButton
              onClick={() => {
                navigate(`/admin/role/${row.id}`);
              }}
            >
              <Edit />
            </IconButton>
            <IconAction title="Xoá" icon={<Trash />} onClick={() => handleDelete(row.id)} color="error" />
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
      <RoleDeleteDialog />
    </>
  );
};

export default memo(RoleTable);
