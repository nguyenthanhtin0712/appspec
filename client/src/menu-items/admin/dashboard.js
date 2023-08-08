// type
import { Home3, HomeTrendUp } from 'iconsax-react';
import WebIcon from '@mui/icons-material/Web';
// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  page: WebIcon
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
      title: 'Dashboard',
      type: 'item',
      url: '/admin',
      icon: icons.dashboard
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
