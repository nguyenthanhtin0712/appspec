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
  setIdDeleteIntership,
  setInternshipGraduationDialog,
  setIdUpdate
} from 'store/slices/internshipGraduationSlice';
import { dispatch } from 'store/index';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import IconAction from 'components/IconAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const InternshipGraduationTable = () => {
  const navigate = useNavigate();
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
        Cell: ({ cell }) => cell.row.original.openclasstime.openclass_time_semester
      },
      {
        header: 'Năm',
        size: 10,
        Cell: ({ cell }) => cell.row.original.openclasstime.openclass_time_year
      },
      {
        accessorKey: 'internship_graduation_start_date',
        header: 'Thời gian bắt đầu',
        Cell: ({ cell }) => formatDDMMYYYY(cell.getValue())
      },
      {
        accessorKey: 'internship_graduation_end_date',
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

  const handleUpdate = (row) => {
    const data = {
      internship_graduation_id: row.internship_graduation_id,
      openclass_semester: row.openclasstime.openclass_time_semester,
      openclass_year: row.openclasstime.openclass_time_year,
      internship_graduation_start_date: row.internship_graduation_start_date,
      internship_graduation_end_date: row.internship_graduation_end_date
    };
    dispatch(setIdUpdate(row.internship_graduation_id));
    dispatch(setInternshipGraduationDialog({ open: true, action: 'update', initValue: data }));
  };

  const handleAssignment = (data) => {
    let registerItenshipEndTime = new Date(data.register_internship_end_date);
    let currentTime = new Date();
    if (registerItenshipEndTime > currentTime) {
      toast.warning('Còn thời gian đăng ký thực tập');
    } else {
      navigate(`/admin/assignment_intern/${data.internship_graduation_id}`);
    }
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        getRowId={(row) => row.internship_graduation_id}
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
            <IconAction title="Phân công" icon={<ArrowDown3 />} onClick={() => handleAssignment(row.original)} />
            <IconAction title="Đợt đăng ký  & Danh sách công ty" icon={<Calendar />} href={`/admin/register-intern/${row.id}`} />
            <IconAction title="Xem chi tiết" icon={<Eye />} href={`/admin/assignment_detail/${row.id}`} />
            <IconAction title="Chỉnh sửa" icon={<Edit />} onClick={() => handleUpdate(row.original)} />
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

export default memo(InternshipGraduationTable);
