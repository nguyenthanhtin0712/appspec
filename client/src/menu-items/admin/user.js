// type
import { Home3, Profile2User, Teacher, People } from 'iconsax-react';
// icons
const icons = {
  navigation: Home3,
  student: Profile2User,
  people: People,
  jobholder: Teacher
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
      id: 'jobholder',
      title: 'Viên chức',
      type: 'item',
      url: '/admin/jobhodler',
      icon: icons.jobholder
    },
    {
      id: 'employer',
      title: 'Nhà tuyển dụng',
      type: 'item',
      url: '/admin/employer',
      icon: icons.people
    }
  ]
};

export default user;
