import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, Trash } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteContact,
  setIdDelete,
  setOpenConfirm,
  setViewContact,
  setOpenContact,
  checkViewContact
} from 'store/slices/contactSlice';
import { dispatch } from 'store/index';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import ConfirmDialog from 'components/ConfirmDialog';
import { Button, Chip, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import IconAction from 'components/IconAction';
import WithPermission from 'guards/WithPermission';

const ContactTable = () => {
  const theme = useTheme();

  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination, openConfirm, idDelete } =
    useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const handleCloseConfirm = () => {
    dispatch(setOpenConfirm(false));
    dispatch(setIdDelete(null));
  };

  const handleDelete = (id) => {
    dispatch(setOpenConfirm(true));
    dispatch(setIdDelete(id));
  };

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
        accessorKey: 'created_at',
        header: 'Thời gian',
        Cell: ({ cell }) => formatDateTimeDisplay(cell.row.original.created_at)
      },
      {
        accessorKey: 'contact_check',
        header: 'Trạng thái',
        Cell: (cell) => {
          return cell.row.original.contact_check == 1 ? <Chip label="Đã xem" color="success" /> : <Chip label="Chưa xem" color="warning" />;
        },
        size: 5
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
                let contactView = data.find((contact) => contact.contact_id == row.original.contact_id);
                dispatch(setOpenContact(true));
                dispatch(setViewContact(contactView));
                if (row.original.contact_check == 0) dispatch(checkViewContact(row.original.contact_id));
              }}
            />
            <WithPermission requiredPermission={['contact.delete']}>
              <IconAction title="Xoá" icon={<Trash />} color="error" onClick={() => handleDelete(row.original.contact_id)} />
            </WithPermission>
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
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<Typography variant="h6">Bạn có chắc chắn muốn xóa ?</Typography>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await dispatch(deleteContact(idDelete));
                handleCloseConfirm();
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
