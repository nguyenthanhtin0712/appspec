import { Book, FolderOpen } from 'iconsax-react';

const icons = {
  subject: Book,
  open_subject: FolderOpen
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
    },
    {
      id: 'open-subject',
      title: 'Học phần dự kiến mở',
      type: 'item',
      url: '/admin/subject-schedule',
      icon: icons.open_subject
    }
  ]
};

export default subject;
