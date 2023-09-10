// type
import { BrifecaseTimer } from 'iconsax-react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
// icons
const icons = {
  company: ApartmentIcon,
  intern: SettingsEthernetIcon,
  assignment: BrifecaseTimer
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
      id: 'internship-graduation',
      title: 'Thực tập tốt nghiệp',
      type: 'item',
      url: '/admin/internship-graduation',
      icon: icons.assignment
    }
  ]
};

export default intern;
