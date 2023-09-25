import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { setContactDialog } from 'store/reducers/contactSlice';
import { dispatch } from 'store/index';
import { ContactForm } from 'sections/admin/contact/ContactForm';

import { getContactConfig } from 'store/reducers/contactSlice';

const ContactDialog = () => {
  const { contactDialog } = useSelector((state) => state.contact);

  useEffect(() => {
    const fetch = async () => {
      dispatch(getContactConfig());
    };
    fetch();
  }, []);

  return (
    <Dialog
      open={contactDialog.open}
      onClose={() => {
        dispatch(setContactDialog({ open: false }));
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitleCustom>Thông tin liên hệ</DialogTitleCustom>
      <ContactForm initialValues={contactDialog?.init} />
    </Dialog>
  );
};

export default memo(ContactDialog);
