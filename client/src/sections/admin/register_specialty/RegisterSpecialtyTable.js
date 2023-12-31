import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, Trash, Edit, SearchNormal } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteRegisterSpecalty
} from 'store/slices/registerSpecialtyAdminSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { Link } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import WithPermission from 'guards/WithPermission';

const RegisterSpecialtyTable = () => {
  const theme = useTheme();
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.register_specialty
  );

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'register_specialty_id',
        header: 'ID',
        size: 30
      },
      {
        accessorKey: 'register_specialty_name',
        header: 'Tên đợt',
        size: 240
      },
      {
        accessorKey: 'register_specialty_start_date',
        header: 'Thời gian bắt đầu',
        Cell: ({ cell }) => formatDateTimeDisplay(cell.getValue())
      },
      {
        accessorKey: 'register_specialty_end_date',
        header: 'Thời gian kết thúc',
        Cell: ({ cell }) => formatDateTimeDisplay(cell.getValue())
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
        getRowId={(row) => row.register_specialty_id}
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
            <WithPermission requiredPermission={['register_spec.view']}>
              <IconButton component={Link} to={`/admin/register_specialty/${row.id}`}>
                <Eye />
              </IconButton>
            </WithPermission>
            <WithPermission requiredPermission={['register_spec.update']}>
              <IconButton component={Link} to={`/admin/register_specialty/edit/${row.id}`}>
                <Edit />
              </IconButton>
            </WithPermission>
            <WithPermission requiredPermission={['register_spec.delete']}>
              <IconButton color="error" onClick={() => handleDelete(row.id)}>
                <Trash />
              </IconButton>
            </WithPermission>
          </Stack>
        )}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            size: 120
          }
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
          placeholder: 'Tìm kiếm đợt đăng ký ...',
          sx: { minWidth: '300px' },
          variant: 'outlined',
          size: 'small',
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton variant="contained" shape="rounded" size="small">
                  <SearchNormal />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />

      <ConfirmDialog
        open={openCofirm}
        onClose={handleCloseCofirm}
        title="Delete"
        content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await dispatch(deleteRegisterSpecalty(idDelete));
                handleCloseCofirm();
                toast.success('Xóa đợt đăng ký thành công!');
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
    </>
  );
};

export default memo(RegisterSpecialtyTable);
