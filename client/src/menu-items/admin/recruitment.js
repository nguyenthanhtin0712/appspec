// type
import { ArchiveBook, GlobalSearch } from 'iconsax-react';
// icons
const icons = {
  managepost: GlobalSearch,
  jobpost: ArchiveBook
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'recruitment',
  title: 'Tuyển dụng',
  type: 'group',
  children: [
    {
      id: 'manage-post',
      title: 'Quản lý tin tuyển dụng',
      type: 'item',
      url: '/admin/manage-job-post',
      icon: icons.managepost,
      permission: ['job_post.confirm']
    },
    {
      id: 'post',
      title: 'Tin tuyển dụng của bạn',
      type: 'item',
      url: '/admin/job-post',
      icon: icons.jobpost,
      permission: ['job_post.create']
    }
  ]
};

export default dashboard;
