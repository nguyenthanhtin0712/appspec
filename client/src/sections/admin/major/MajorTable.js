import React, { memo, useCallback, useEffect } from 'react';
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
  setMajorDialog,
  setOpenCofirmDialog,
  setIdDelete
} from 'store/reducers/majorSlice';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Export } from 'iconsax-react';
import { utils, writeFileXLSX } from 'xlsx';

const MajorTable = () => {
  const theme = useTheme();

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
    dispatch(setOpenCofirmDialog(true));
    dispatch(setIdDelete(id));
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
          <Stack direction="row">
            <IconButton onClick={() => handleUpdate(row.original)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.id)}>
              <Trash />
            </IconButton>
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
          <Button color="success" onClick={handleExportData} startIcon={<Export />} variant="contained">
            Xuất Excel
          </Button>
        )}
      />
    </>
  );
};

export default memo(MajorTable);
