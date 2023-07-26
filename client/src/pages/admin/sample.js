import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { fetchData, setColumnFilters, setGlobalFilter, setSorting, setPagination } from '../../store/reducers/user';
import { dispatch } from 'store/index';

const Example = () => {
  const { data, isError, isLoading, isRefetching, rowCount, columnFilters, globalFilter, sorting, pagination } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'user_id',
        header: 'User Id'
      },
      {
        accessorKey: 'user_firstname',
        header: 'First Name'
      },
      {
        accessorKey: 'user_lastname',
        header: 'Last Name'
      },
      {
        accessorKey: 'user_email',
        header: 'Email'
      },
      {
        accessorKey: 'user_birthday',
        header: 'Birthday'
      }
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      getRowId={(row) => row.user_id}
      options={{
        initialPage: 1
      }}
      manualFiltering
      manualPagination
      manualSorting
      muiToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: 'Error loading data'
            }
          : undefined
      }
      onColumnFiltersChange={(updater) => dispatch(setColumnFilters(updater(columnFilters)))}
      onGlobalFilterChange={(filter) => dispatch(setGlobalFilter(filter))}
      onPaginationChange={(updater) => {
        const nextState = updater(pagination);
        dispatch(setPagination(nextState));
      }}
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
      positionToolbarAlertBanner="bottom"
    />
  );
};

export default Example;
