import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Edit, Eye, SearchNormal, Trash } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setSubjectScheduleDialog,
  setOpenCofirmDialog,
  setIdDeleteSubject,
  setIdSelect
} from 'store/reducers/subjectScheduleSlice';
import { dispatch } from 'store/index';
import IconAction from 'components/IconAction';
import { IconButton, InputAdornment } from '@mui/material';

const SubjectScheduleTable = () => {
  const theme = useTheme();

  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.subject_schedule
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'openclass_time_semester',
        header: 'Học kỳ'
      },
      {
        accessorKey: 'openclass_time_year',
        header: 'Năm học'
      }
    ],
    []
  );

  const handleDelete = (id) => {
    dispatch(setOpenCofirmDialog(true));
    dispatch(setIdDeleteSubject(id));
  };

  const handleUpdate = (data) => {
    const major = { major_id: data.major_id, major_name: data.major_name };
    dispatch(setSubjectScheduleDialog({ open: true, action: 'update', initValue: major }));
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.openclass_time_id}
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
            <IconAction title="Xem chi tiết" icon={<Eye />} onClick={() => dispatch(setIdSelect(row.id))} />
            <IconAction title="Chỉnh sửa" icon={<Edit />} onClick={() => handleUpdate(row.original)} />
            <IconAction title="Xoá" icon={<Trash />} onClick={() => handleDelete(row.id)} color="error" />
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
          placeholder: 'Tìm kiếm học kỳ, năm học ...',
          sx: { minWidth: '300px' },
          variant: 'outlined',
          size: 'small',
          InputProps: {
            startAdornment: (
              <InputAdornment>
                <IconButton variant="contained" shape="rounded" size="small">
                  <SearchNormal />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </>
  );
};

export default memo(SubjectScheduleTable);
