// type
import { UserMinus, MedalStar } from 'iconsax-react';
// icons
const icons = {
  warned: UserMinus,
  graduated: MedalStar
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const student = {
  id: 'group-student',
  title: 'Quản lý sinh viên',
  type: 'group',
  children: [
    {
      id: 'warned',
      title: 'Cảnh cáo & Buộc thôi học',
      type: 'item',
      url: '/admin/warned-student',
      icon: icons.warned
    },
    {
      id: 'graduated',
      title: 'Tốt nghiệp',
      type: 'item',
      url: '/admin/title',
      icon: icons.graduated
    }
  ]
};

export default student;
