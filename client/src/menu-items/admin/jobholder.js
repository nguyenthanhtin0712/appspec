// type
import { Augur, GlobalSearch } from 'iconsax-react';
// icons
const icons = {
  grading: Augur,
  post: GlobalSearch
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-jobholder',
  title: 'Giảng viên',
  type: 'group',
  children: [
    {
      id: 'grading',
      title: 'Chấm điểm',
      type: 'item',
      url: '/admin/grading',
      icon: icons.grading
    },
    {
      id: 'post',
      title: 'Đăng bài tuyển dụng',
      type: 'item',
      url: '/admin/post',
      icon: icons.post
    }
  ]
};

export default dashboard;
