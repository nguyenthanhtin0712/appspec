import React, { memo, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { setCloseMajorDialog } from 'store/reducers/majorSlice';
import { useSelector } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import { ContactForm } from 'sections/admin/contact/ContactForm';

const ContactDialog = () => {
  const { majorDialog } = useSelector((state) => state.major);
  const initialValues = useMemo(() => majorDialog.initValue, [majorDialog.initValue]);
  const action = useMemo(() => majorDialog.action, [majorDialog.action]);

  return (
    <Dialog open={majorDialog.open} onClose={() => dispatch(setCloseMajorDialog())} maxWidth="xs">
      <DialogTitleCustom onClose={() => dispatch(setCloseMajorDialog())}>
        {action === 'add' ? 'Thêm ngành' : 'Chỉnh sửa ngành'}
      </DialogTitleCustom>
      <ContactForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(ContactDialog);
