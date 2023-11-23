import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, Trash } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination, deleteContact } from 'store/slices/contactSlice';
import { dispatch } from 'store/index';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import ConfirmDialog from 'components/ConfirmDialog';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import IconAction from 'components/IconAction';

const ContactTable = () => {
  const theme = useTheme();
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };
  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.contact
  );
  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'contact_fullname',
        header: 'Người liên hệ'
      },
      {
        accessorKey: 'contact_email',
        header: 'Email'
      },
      {
        accessorKey: 'contact_phone',
        header: 'Phone'
      },
      {
        accessorKey: 'created_at',
        header: 'Thời gian',
        Cell: ({ cell }) => formatDateTimeDisplay(cell.getValue())
      }
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.contact_id}
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
          <Stack direction="row">
            <IconAction
              title={'Xem'}
              icon={<Eye />}
              onClick={() => {
                console.log('row.original.contact_id', row.original.contact_id);
              }}
            />
            <IconAction title="Xoá" icon={<Trash />} onClick={() => handleDelete(row.original.contact_id)} />
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
        positionGlobalFilter="left"
        initialState={{
          showGlobalFilter: true
        }}
        muiSearchTextFieldProps={{
          placeholder: 'Tìm kiếm...',
          sx: { minWidth: '300px' },
          variant: 'outlined',
          size: 'small'
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
                await dispatch(deleteContact(idDelete));
                handleCloseCofirm();
                toast.success('Xóa thông tin liên hệ thành công');
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

export default memo(ContactTable);
