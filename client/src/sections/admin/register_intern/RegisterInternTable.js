import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, Trash, Edit, ArrowDown3 } from 'iconsax-react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  deleteRegisterSpecalty
} from 'store/reducers/registerInternAdminSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { Link } from 'react-router-dom';

const RegisterSpecialtyTable = () => {
  const theme = useTheme();
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.register_intern
  );

  console.log(data);

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'register_specialty_name',
        header: 'Tên đợt',
        size: 240,
        Cell: ({ cell }) => {
          return (
            <div>
              Đợt đăng ký năm {cell.row.original.internship_graduation.openclasstime.openclass_time_year} học kỳ{' '}
              {cell.row.original.internship_graduation.openclasstime.openclass_time_semester}
            </div>
          );
        }
      },
      {
        header: 'Năm',
        size: 10,
        Cell: ({ cell }) => cell.row.original.internship_graduation.openclasstime.openclass_time_year
      },
      {
        header: 'Học kỳ',
        size: 10,
        Cell: ({ cell }) => cell.row.original.internship_graduation.openclasstime.openclass_time_semester
      },
      {
        accessorKey: 'intern_registration_start_date',
        header: 'Thời gian bắt đầu',
        Cell: ({ cell }) => formatDateTimeDisplay(cell.getValue())
      },
      {
        accessorKey: 'intern_registration_end_date',
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
        getRowId={(row) => row.register_internship_id}
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
            <IconButton component={Link} to={`/admin/assignment_intern/${row.id}`}>
              <ArrowDown3 />
            </IconButton>
            <IconButton component={Link} to={`/admin/register_specialty/${row.id}`}>
              <Eye />
            </IconButton>
            <IconButton component={Link} to={`/admin/register_specialty_edit/${row.id}`}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.id)}>
              <Trash />
            </IconButton>
          </Box>
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
