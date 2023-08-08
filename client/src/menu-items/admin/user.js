// type
import { Home3, Profile2User, Teacher } from 'iconsax-react';
// icons
const icons = {
  navigation: Home3,
  student: Profile2User,
  teacher: Teacher
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const user = {
  id: 'group-user',
  title: 'Người dùng',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'student',
      title: 'Sinh viên',
      type: 'item',
      url: '/admin/student',
      icon: icons.student
    },
    {
      id: 'teacher',
      title: 'Giảng viên',
      type: 'item',
      url: '/admin/teacher',
      icon: icons.teacher
    }
  ]
};

export default user;
