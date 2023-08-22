import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, ExportSquare, Trash } from 'iconsax-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteJobholder,
  setJobholderDialog
} from 'store/reducers/jobholderSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';

const JobholderTable = () => {
  const theme = useTheme();
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.jobholder
  );
  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'jobholder_code',
        header: 'MaGV',
        size: 5
      },
      {
        accessorKey: 'user.user_firstname',
        header: 'Họ'
      },
      {
        accessorKey: 'user.user_lastname',
        header: 'Tên',
        size: 5
      },
      {
        accessorKey: 'degree.degree_name',
        header: 'Học vị',
        size: 5
      },
      {
        accessorKey: 'title.title_name',
        header: 'Chức vụ',
        size: 10
      },
      {
        accessorKey: 'academic_field.academic_field_name',
        header: 'Bộ môn',
        size: 20
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

  const handleUpdate = (data) => {
    const value = {
      user_firstname: data?.user?.user_firstname,
      user_lastname: data?.user?.user_lastname,
      user_gender: data?.user?.user_gender,
      user_birthday: null,
      user_password: 'password',
      jobholder_code: data?.jobholder_code,
      degree_id: data?.degree_id || '',
      title_id: data?.title_id || '',
      academic_field_id: data?.academic_field_id || '',
      jobholder_isLeader: data?.jobholder_isLeader
    };
    dispatch(setJobholderDialog({ open: true, action: 'update', initValue: value }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.jobholder_code}
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
            <IconButton onClick={() => handleUpdate(row.original)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.original.jobholder_code)}>
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
          <Tooltip title="Xuất Excel">
            <IconButton
              color="success"
              onClick={() => {
                alert('Chưa khả dụng');
              }}
              variant="contained"
            >
              <ExportSquare variant="Bulk" />
            </IconButton>
          </Tooltip>
        )}
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
                await dispatch(deleteJobholder(idDelete));
                handleCloseCofirm();
                toast.success('Xóa ngành thành công!');
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

export default memo(JobholderTable);
