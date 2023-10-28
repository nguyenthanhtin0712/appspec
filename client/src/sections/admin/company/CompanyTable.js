import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Trash } from 'iconsax-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setcompanyDialog,
  setOpenCofirmDialog,
  setIdDeleteCompany
} from 'store/slices/companySlice';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Export } from 'iconsax-react';

const CompanyTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'company_name',
        header: 'Tên công ty'
      },
      {
        accessorKey: 'company_host',
        header: 'HOST'
      },
      {
        accessorKey: 'user.user_firstname',
        header: 'Họ'
      },
      {
        accessorKey: 'user.user_lastname',
        header: 'Tên'
      },
      {
        accessorKey: 'conpany_is_offcial',
        header: 'Chính thức',
        size: 10,
        Cell: ({ cell }) => {
          return <div>{cell.row.original.company_is_official ? 'Chính thức' : 'Không'}</div>;
        }
      }
    ],
    []
  );

  const handleDelete = (id) => {
    dispatch(setOpenCofirmDialog(true));
    dispatch(setIdDeleteCompany(id));
  };

  const handleUpdate = (data) => {
    data = {
      ...data,
      company_is_official: data.company_is_official,
      user_firstname: data.user.user_firstname,
      user_lastname: data.user.user_lastname,
      user_phone: data.user.user_phone,
      user_email: data.user.user_email,
      user_password: ''
    };
    delete data.user;
    dispatch(setcompanyDialog({ open: true, action: 'update', initValue: data }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.company_id}
        enableRowNumbers
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
          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={() => {
                handleUpdate(row.original);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.id)}>
              <Trash />
            </IconButton>
          </Box>
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

export default memo(CompanyTable);
