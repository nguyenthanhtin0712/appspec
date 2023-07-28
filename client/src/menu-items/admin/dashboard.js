// type
import { Home3, HomeTrendUp, BitcoinRefresh, CodeCircle, Briefcase, ArchiveAdd, Profile2User } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  sample: BitcoinRefresh,
  major: CodeCircle,
  specialty: Briefcase,
  register_specialty: ArchiveAdd,
  student: Profile2User
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
      id: 'student',
      title: 'Sinh viên',
      type: 'item',
      url: '/admin/student',
      icon: icons.student
    },
    {
      id: 'register_specialty',
      title: 'Đăng ký Chuyên ngành',
      type: 'item',
      url: '/admin/register_specialty',
      icon: icons.register_specialty
    },
    {
      id: 'sample',
      title: 'Sample',
      type: 'item',
      url: '/admin/sample-page',
      icon: icons.sample
    }
  ]
};

export default dashboard;
