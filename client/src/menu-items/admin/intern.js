// type
import { People } from 'iconsax-react';
// icons
const icons = {
  dashboard: People
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const intern = {
  id: 'group-specialty',
  title: 'Quản lý thực tập',
  icon: icons.People,
  type: 'group',
  children: [
    {
      id: 'employer',
      title: 'Nhà tuyển dụng',
      type: 'item',
      url: '/admin/major',
      icon: icons.major
    }
  ]
};

export default intern;
