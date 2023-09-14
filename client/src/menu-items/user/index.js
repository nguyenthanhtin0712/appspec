export const navItems = [
  {
    name: 'Trang chủ',
    url: '/'
  },
  {
    name: 'Đăng ký chuyên ngành',
    url: '/register_speciality',
    children: [
      {
        name: 'Đăng ký',
        url: '/register_speciality/register'
      },
      {
        name: 'Kết quả đăng ký',
        url: '/register_speciality/result'
      },
      {
        name: 'Điều lệ đăng ký',
        url: '/register_speciality/rules'
      },
      {
        name: 'Hướng dẫn đăng ký',
        url: '#'
      }
    ]
  },
  {
    name: 'Chuyên ngành',
    children: [
      {
        name: 'Công nghệ thông tin',
        children: [
          {
            name: 'Hệ thống thông tin',
            url: '#'
          },
          {
            name: 'Kỹ thuật phần mềm',
            url: '#'
          },
          {
            name: 'Khoa học máy tính',
            url: '#'
          },
          {
            name: 'Kỹ thuật máy tính',
            url: '#'
          }
        ]
      },
      {
        name: 'Kỹ thuật phần mềm',
        children: [
          {
            name: 'Lập trình web',
            url: '#'
          },
          {
            name: 'Lập trình ứng dụng',
            url: '#'
          }
        ]
      }
    ]
  },
  {
    name: 'Đăng ký học cải thiện',
    children: [
      {
        name: 'Đăng ký',
        url: '#'
      },
      {
        name: 'Kết quả đăng ký',
        url: '#'
      }
    ]
  },
  {
    name: 'Đăng ký thực tập',
    url: '/register_intern',
    children: [
      {
        name: 'Đăng ký trong danh sách',
        url: '/register_intern/register'
      },
      {
        name: 'Đăng ký ngoài danh sách',
        url: '/register_intern/register_out_offcial'
      },
      {
        name: 'Kết quả đăng ký',
        url: '/register_intern/result'
      }
    ]
  },
  {
    name: 'Liên hệ',
    url: '/contact'
  }
];
