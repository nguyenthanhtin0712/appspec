import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Eye, Trash } from 'iconsax-react';
import Box from '@mui/material/Box';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeletePage } from 'store/reducers/pageSlice';

import { dispatch } from 'store/index';
import dayjs from 'dayjs';
import IconAction from 'components/IconAction';

const PageTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.page
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'page_id',
        header: 'ID',
        size: 30
      },
      {
        accessorKey: 'page_title',
        header: 'Tên trang',
        size: 240
      },
      {
        accessorKey: 'created_at',
        header: 'Thời gian tạo',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm')
      },
      {
        accessorKey: 'updated_at',
        header: 'Thời gian cập nhật',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm')
      }
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.page_id}
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
            <IconAction title={'Xem'} icon={<Eye />} href={`/page/${row.original.page_slug}`} />
            <IconAction title={'Chỉnh sửa'} icon={<Edit />} href={`/admin/page/edit/${row.id}`} />
            <IconAction title={'Xoá'} color="error" icon={<Trash />} onClick={() => dispatch(setIdDeletePage(row.id))} />
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
          placeholder: 'Tìm kiếm trang',
          sx: { minWidth: '300px' },
          variant: 'outlined',
          size: 'small'
        }}
      />
    </>
  );
};

export default memo(PageTable);
