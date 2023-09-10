// type
import { Gemini2, MedalStar } from 'iconsax-react';
// icons
const icons = {
  title: Gemini2,
  degree: MedalStar
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const title = {
  id: 'group-title',
  title: 'Quản lý chức vụ',
  type: 'group',
  children: [
    {
      id: 'title',
      title: 'Chức vụ',
      type: 'item',
      url: '/admin/title',
      icon: icons.title
    }
  ]
};

export default title;
