const getJobPostStatus = (value) => {
  const obj = [
    {
      text: 'Chưa phê duyệt',
      color: 'warning'
    },
    {
      text: 'Đã phê duyệt',
      color: 'success'
    },
    {
      text: 'Đã huỷ',
      color: 'error'
    }
  ];
  return obj[value];
};

export default getJobPostStatus;
