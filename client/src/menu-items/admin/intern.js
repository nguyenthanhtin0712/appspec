// type
import { Augur, BrifecaseTimer } from 'iconsax-react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
// icons
const icons = {
  company: ApartmentIcon,
  intern: SettingsEthernetIcon,
  assignment: BrifecaseTimer,
  grading: Augur
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
      title: 'Đăng ký thực tập',
      type: 'item',
      url: '/admin/internship-graduation',
      icon: icons.assignment
    },
    {
      id: 'grading',
      title: 'Chấm điểm',
      type: 'item',
      url: '/admin/grading',
      icon: icons.grading
    }
  ]
};

export default intern;
