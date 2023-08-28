// type
import { DocumentCopy, Home3, HomeTrendUp, Setting2 } from 'iconsax-react';
// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  page: DocumentCopy,
  config: Setting2
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/admin',
      icon: icons.dashboard
    },
    {
      id: 'config',
      title: 'Cấu hình',
      type: 'item',
      url: '/admin/config',
      icon: icons.config
    },
    {
      id: 'page',
      title: 'Quản lý trang',
      type: 'item',
      url: '/admin/page',
      icon: icons.page
    }
  ]
};

export default dashboard;
