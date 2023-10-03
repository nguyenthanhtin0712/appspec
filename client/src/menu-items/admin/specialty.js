// type
import { HomeTrendUp, CodeCircle, Briefcase, ArchiveAdd } from 'iconsax-react';
// icons
const icons = {
  dashboard: HomeTrendUp,
  major: CodeCircle,
  specialty: Briefcase,
  register_specialty: ArchiveAdd
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const specialty = {
  id: 'group-specialty',
  title: 'Quản lý chuyên ngành',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'major',
      title: 'Ngành',
      type: 'item',
      url: '/admin/major',
      icon: icons.major
    },
    {
      id: 'specialty',
      title: 'Chuyên ngành',
      type: 'item',
      url: '/admin/specialty',
      icon: icons.specialty
    },
    {
      id: 'register_specialty',
      title: 'Đăng ký chuyên ngành',
      type: 'item',
      url: '/admin/register_specialty',
      icon: icons.register_specialty
    }
  ]
};

export default specialty;
