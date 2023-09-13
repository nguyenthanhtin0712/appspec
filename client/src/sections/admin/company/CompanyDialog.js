import React, { memo, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';

import { setCloseDialog } from 'store/reducers/companySlice';
import { useSelector } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import CompanyForm from 'sections/admin/company/CompanyForm';

const CompanyDialog = () => {
  const { companyDialog } = useSelector((state) => state.company);
  const initialValues = useMemo(() => companyDialog.initValue, [companyDialog.initValue]);
  const action = useMemo(() => companyDialog.action, [companyDialog.action]);

  const handleClose = () => {
    dispatch(setCloseDialog());
  };

  return (
    <Dialog open={companyDialog.open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm công ty' : 'Chỉnh sửa công ty'}</DialogTitleCustom>
      <CompanyForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(CompanyDialog);
