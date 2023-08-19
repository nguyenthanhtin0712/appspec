import { Book } from 'iconsax-react';

const icons = {
  subject: Book
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const subject = {
  id: 'group-subject',
  title: 'Quản lý học phần',
  type: 'group',
  children: [
    {
      id: 'subject',
      title: 'Học phần',
      type: 'item',
      url: '/admin/subject',
      icon: icons.subject
    }
  ]
};

export default subject;
