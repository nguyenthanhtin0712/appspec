// type
// import { People } from 'iconsax-react';
import ApartmentIcon from '@mui/icons-material/Apartment';
// icons
const icons = {
  company: ApartmentIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const intern = {
  id: 'group-intern',
  title: 'Quản lý thực tập',
  type: 'group',
  children: [
    {
      id: 'company',
      title: 'Công ty',
      type: 'item',
      url: '/admin/company',
      icon: icons.company
    }
  ]
};

export default intern;
