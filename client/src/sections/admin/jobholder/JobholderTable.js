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
} from 'store/slices/jobholderSlice';
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
        header: 'Họ',
        Cell: ({ cell }) => {
          return <div>{cell.row.original.user.user_firstname}</div>;
        }
      },
      {
        header: 'Tên',
        size: 5,
        Cell: ({ cell }) => {
          return <div>{cell.row.original.user.user_lastname}</div>;
        }
      },
      {
        accessorKey: 'jobholder_degree',
        header: 'Học vị',
        size: 5
      },
      {
        header: 'Chức vụ',
        size: 10,
        Cell: ({ cell }) => {
          return <div>{cell.row.original.title.title_name}</div>;
        }
      },
      {
        header: 'Bộ môn',
        size: 20,
        Cell: ({ cell }) => {
          return <div>{cell.row.original.academic_field.academic_field_name}</div>;
        }
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
      user_id: data?.user.user_id,
      user_firstname: data?.user?.user_firstname,
      user_lastname: data?.user?.user_lastname,
      user_gender: data?.user?.user_gender,
      user_birthday: data?.user?.user_birthday || null,
      user_password: '',
      user_phone: data?.user?.user_phone,
      user_email: data?.user?.user_email,
      jobholder_unit: data?.jobholder_unit,
      jobholder_specialty: data?.jobholder_specialty,
      jobholder_position: data?.jobholder_position,
      jobholder_type: data?.jobholder_type,
      jobholder_degree: data?.jobholder_degree,
      jobholder_code: data?.jobholder_code,
      degree_id: data?.degree_id || '',
      title_id: data?.title_id || '',
      academic_field_id: data?.academic_field_id || '',
      jobholder_isLeader: data?.jobholder_isLeader == 1 ? true : false
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
                toast.success('Xóa viên chức thành công');
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
