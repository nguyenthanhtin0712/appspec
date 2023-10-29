import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Eye, SearchNormal, Trash } from 'iconsax-react';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeleteJobPost } from 'store/slices/jobPostSlice';

import { dispatch } from 'store/index';
import dayjs from 'dayjs';
import IconAction from 'components/IconAction';
import { Chip, InputAdornment, Stack } from '@mui/material';
import getJobPostStatus from 'utils/getJobPostStatus';

const JobPostTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.job_post
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
        size: 250
      },
      {
        accessorKey: 'job_post_confirm',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
          const variant = getJobPostStatus(cell.getValue());
          return <Chip label={variant.text} color={variant.color} />;
        },
        size: 5
      },
      {
        accessorKey: 'created_at',
        header: 'Thời gian tạo',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm'),
        size: 5
      },
      {
        accessorKey: 'updated_at',
        header: 'Thời gian cập nhật',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm'),
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
          <Stack direction="row" flexWrap="nowrap">
            <IconAction title={'Xem'} icon={<Eye />} href={`/page/${row.original.page_slug}`} />
            <IconAction title={'Chỉnh sửa'} icon={<Edit />} href={`/admin/job-post/edit/${row.id}`} />
            <IconAction title={'Xoá'} color="error" icon={<Trash />} onClick={() => dispatch(setIdDeleteJobPost(row.id))} />
          </Stack>
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

export default memo(JobPostTable);
