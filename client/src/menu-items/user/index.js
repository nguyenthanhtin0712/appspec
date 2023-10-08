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
    name: 'Đăng ký thực tập',
    url: '/register_intern',
    children: [
      {
        name: 'Đăng ký',
        url: '/register_intern/register'
      },
      {
        name: 'Bổ sung thông tin',
        url: '/register_intern/additional'
      },
      {
        name: 'Kết quả đăng ký',
        url: '/register_intern/result'
      }
    ]
  },
  {
    name: 'Đăng ký học cải thiện',
    url: '/register-open-class'
  },
  {
    name: 'Liên hệ',
    url: '/contact'
  }
];
