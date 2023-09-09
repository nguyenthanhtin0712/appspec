// type
import { Blur } from 'iconsax-react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
// icons
const icons = {
  company: ApartmentIcon,
  intern: SettingsEthernetIcon,
  assignment: Blur
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
    },
    {
      id: 'register_intern',
      title: 'Thực tập tốt nghiệp',
      type: 'item',
      url: '/admin/register_intern',
      icon: icons.assignment
    }
  ]
};

export default intern;
