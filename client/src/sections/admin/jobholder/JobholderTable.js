import React, { memo, useCallback, useEffect, useState } from 'react';
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
  deleteJobholder,
  setJobholderDialog
} from 'store/reducers/jobholderSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { Export } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';

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

  const handleExportData = useCallback(() => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    const columnWidths = {};

    data.forEach((row) => {
      Object.entries(row).forEach(([key, cell]) => {
        const cellValue = cell !== null ? cell.toString() : '';
        const cellLength = cellValue.length;
        columnWidths[key] = Math.max(columnWidths[key] || 0, cellLength);
      });
    });

    ws['!cols'] = Object.keys(columnWidths).map((key) => ({
      width: columnWidths[key] + 2 // Adding extra padding
    }));

    utils.book_append_sheet(wb, ws, 'jobholder');
    writeFileXLSX(wb, 'jobholder.xlsx');
  }, [data]);

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'jobholder_code',
        header: 'MaGV',
        size: 10
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
        accessorKey: 'user.user_gender',
        header: 'Giới tính',
        size: 5,
        Cell: ({ cell }) => {
          return <div>{cell?.row?.original?.user?.user_gender == 0 ? 'Nam' : 'Nữ'}</div>;
        }
      },
      {
        accessorKey: 'degree.degree_name',
        header: 'Học vị'
      },
      {
        accessorKey: 'title.title_name',
        header: 'Chức vụ'
      },
      {
        accessorKey: 'academic_field.academic_field_name',
        header: 'Bộ môn'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

  const handleUpdate = (data) => {
    const jobholder = { jobholder_id: data.jobholder_id, jobholder_name: data.jobholder_name };
    dispatch(setJobholderDialog({ open: true, action: 'update', initValue: jobholder }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.jobholder_code}
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
          <Button color="success" onClick={handleExportData} startIcon={<Export />} variant="contained">
            Xuất Excel
          </Button>
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
