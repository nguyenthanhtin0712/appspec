import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, SearchNormal, Trash } from 'iconsax-react';
import Box from '@mui/material/Box';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setIdDeleteJobPost,
  setViewId
} from 'store/slices/manageJobPostSlice';

import { dispatch } from 'store/index';
import dayjs from 'dayjs';
import IconAction from 'components/IconAction';
import { Chip, InputAdornment } from '@mui/material';
import getJobPostStatus from 'utils/getJobPostStatus';

const ManageJobPostTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.manage_job_post
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'job_post_id',
        header: 'ID',
        size: 5
      },
      {
        accessorKey: 'job_post_title',
        header: 'Tiêu đề',
        size: 240
      },
      {
        accessorKey: 'author_name',
        header: 'Người đăng'
      },
      {
        accessorKey: 'job_post_confirm',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
          const variant = getJobPostStatus(cell.getValue());
          return <Chip label={variant.text} color={variant.color} />;
        }
      },
      {
        accessorKey: 'created_at',
        header: 'Thời gian tạo',
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
        getRowId={(row) => row.job_post_id}
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
            <IconAction title={'Xem'} icon={<Eye />} onClick={() => dispatch(setViewId(row.id))} />
            <IconAction title={'Xoá'} color="error" icon={<Trash />} onClick={() => dispatch(setIdDeleteJobPost(row.id))} />
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
          placeholder: 'Tìm kiếm tin',
          sx: { minWidth: '300px' },
          variant: 'outlined',
          size: 'small',
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal size={15} />
              </InputAdornment>
            )
          }
        }}
      />
    </>
  );
};

export default memo(ManageJobPostTable);
