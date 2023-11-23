// type
import { DirectboxNotif, DocumentCopy, Home3, HomeTrendUp, Setting2, ShieldSecurity } from 'iconsax-react';
// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  page: DocumentCopy,
  config: Setting2,
  contact: DirectboxNotif,
  role: ShieldSecurity
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Hệ thống',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/admin',
      icon: icons.dashboard,
      permission: ['system.update']
    },
    {
      id: 'config',
      title: 'Cấu hình',
      type: 'item',
      url: '/admin/config',
      icon: icons.config,
      permission: ['system.update']
    },
    {
      id: 'contact',
      title: 'Liên hệ',
      type: 'item',
      url: '/admin/contact',
      icon: icons.contact,
      permission: ['contact.view']
    },
    {
      id: 'page',
      title: 'Quản lý trang',
      type: 'item',
      url: '/admin/page',
      icon: icons.page,
      permission: ['page.view']
    },
    {
      id: 'role',
      title: 'Phân quyền',
      type: 'item',
      url: '/admin/role',
      icon: icons.role,
      permission: ['role.view']
    }
  ]
};

export default dashboard;
