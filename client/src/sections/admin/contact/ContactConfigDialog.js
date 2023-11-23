import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { setContactDialog } from 'store/slices/contactSlice';
import { dispatch } from 'store/index';
import { ContactForm } from 'sections/admin/contact/ContactForm';

import { getContactConfig } from 'store/slices/contactSlice';

const ContactConfigDialog = () => {
  const { contactDialog } = useSelector((state) => state.contact);

  useEffect(() => {
    const fetch = async () => {
      dispatch(getContactConfig());
    };
    fetch();
  }, []);

  return (
    <Dialog open={contactDialog.open} onClose={() => dispatch(setContactDialog({ open: false }))} maxWidth="sm" fullWidth>
      <DialogTitleCustom onClose={() => dispatch(setContactDialog({ open: false }))}>Thông tin liên hệ</DialogTitleCustom>
      <ContactForm initialValues={contactDialog?.init} />
    </Dialog>
  );
};

export default memo(ContactConfigDialog);
