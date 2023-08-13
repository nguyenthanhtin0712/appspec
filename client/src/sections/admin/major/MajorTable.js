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
  deleteMajor,
  setMajorDialog
} from 'store/reducers/majorSlice';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { Export } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';

const MajorTable = () => {
  const theme = useTheme();
  const [openCofirm, setOpenCofirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.major
  );

  const handleExportData = useCallback(() => {
    const dataExport = data.map((major) => ({
      id: major.major_id,
      name: major.major_name
    }));

    const wb = utils.book_new();
    const ws = utils.json_to_sheet(dataExport);
    const columnWidths = {};

    dataExport.forEach((row) => {
      Object.entries(row).forEach(([key, cell]) => {
        const cellValue = cell !== null ? cell.toString() : '';
        const cellLength = cellValue.length;
        columnWidths[key] = Math.max(columnWidths[key] || 0, cellLength);
      });
    });

    ws['!cols'] = Object.keys(columnWidths).map((key) => ({
      width: columnWidths[key] + 2 // Adding extra padding
    }));

    utils.book_append_sheet(wb, ws, 'Major');
    utils.sheet_add_aoa(ws, [['Mã ngành', 'Tên ngành']], { origin: 'A1' });
    writeFileXLSX(wb, 'Major.xlsx');
  }, [data]);

  const handleCloseCofirm = () => {
    setOpenCofirm(false);
  };

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'major_id',
        header: 'Mã ngành'
      },
      {
        accessorKey: 'major_name',
        header: 'Tên ngành'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    setOpenCofirm(true);
    setIdDelete(id);
  };

  const handleUpdate = (data) => {
    const major = { major_id: data.major_id, major_name: data.major_name };
    dispatch(setMajorDialog({ open: true, action: 'update', initValue: major }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.major_id}
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
          <Box>
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
                await dispatch(deleteMajor(idDelete));
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

export default memo(MajorTable);
