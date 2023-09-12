import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Eye, Trash, Edit, ArrowDown3, Calendar } from 'iconsax-react';
import Box from '@mui/material/Box';
import { MaterialReactTable } from 'material-react-table';
import {
  fetchData,
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setOpenCofirmDialog,
  setIdDeleteIntership
} from 'store/reducers/internshipGraduationSlice';
import { dispatch } from 'store/index';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import IconAction from 'components/IconAction';

const InternshipGraduationTable = () => {
  const theme = useTheme();
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.internship_graduation
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        header: 'Học kỳ',
        size: 10,
        Cell: ({ cell }) => cell.row.original.internship_graduation.openclasstime.openclass_time_semester
      },
      {
        header: 'Năm',
        size: 10,
        Cell: ({ cell }) => cell.row.original.internship_graduation.openclasstime.openclass_time_year
      },
      {
        accessorKey: 'register_internship_start_date',
        header: 'Thời gian bắt đầu',
        Cell: ({ cell }) => formatDDMMYYYY(cell.getValue())
      },
      {
        accessorKey: 'register_internship_end_date',
        header: 'Thời gian kết thúc',
        Cell: ({ cell }) => formatDDMMYYYY(cell.getValue())
      }
    ],
    []
  );

  const handleDelete = (id) => {
    dispatch(setOpenCofirmDialog(true));
    dispatch(setIdDeleteIntership(id));
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
            <IconAction title="Phân công" icon={<ArrowDown3 />} href={`/admin/assignment_intern/${row.id}`} />
            <IconAction title="Đợt đăng ký" icon={<Calendar />} href={`/admin/register-intern/${row.id}`} />
            <IconAction title="Xem chi tiết" icon={<Eye />} href={`/admin/register_specialty/${row.id}`} />
            <IconAction title="Chỉnh sửa" icon={<Edit />} href={`/admin/register_specialty_edit/${row.id}`} />
            <IconAction title="Xoá" icon={<Trash />} onClick={() => handleDelete(row.id)} color="error" />
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
    </>
  );
};

// const RowAction = ({ rowId, handleDelete }) => {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Tooltip title="Phân công">
//         <IconButton component={Link} to={`/admin/assignment_intern/${rowId}`}>
//           <ArrowDown3 />
//         </IconButton>
//       </Tooltip>
//       <IconButton component={Link} to={`/admin/register_specialty/${rowId}`}>
//         <Eye />
//       </IconButton>
//       <IconButton component={Link} to={`/admin/register_specialty_edit/${rowId}`}>
//         <Edit />
//       </IconButton>
//       <IconButton color="error" onClick={() => handleDelete(rowId)}>
//         <Trash />
//       </IconButton>
//     </Box>
//   );
// };

export default memo(InternshipGraduationTable);