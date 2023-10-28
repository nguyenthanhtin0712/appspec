import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import GradingUpdateTable from 'sections/admin/grading/gradingUpdateTable';
import { getSudentGrading, updateGrade } from 'store/slices/gradingSlice';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import { Edit2 } from 'iconsax-react';
import { toast } from 'react-toastify';

const GradingUpdate = () => {
  const { id } = useParams();
  const { students, grades } = useSelector((state) => state.grading);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      dispatch(getSudentGrading(id));
    };
    fetchData();
  }, [id]);
  if (!students) return null;
  const handleUpdateGrade = () => {
    let result = [];
    let hasEmptyValue = false;

    for (const key in grades) {
      if (Object.prototype.hasOwnProperty.call(grades, key)) {
        const value = grades[key];
        if (value === '') {
          hasEmptyValue = true;
          break; // Dừng vòng lặp nếu có giá trị rỗng
        }
        result.push({ [key]: value }); // Thêm cặp key-value vào mảng result
      }
    }

    if (hasEmptyValue) {
      toast.warning('Vui lòng điền đầy đủ điểm cho sinh viên');
    } else {
      const check = dispatch(updateGrade(result));
      if (check && !check.error) {
        toast.success('Cập nhật điểm thành công!');
        navigate('/admin/grading');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h1">
          Danh sách sinh viên
        </Typography>
        <Button onClick={handleUpdateGrade} variant="contained" startIcon={<Edit2 />}>
          Cập nhật điểm
        </Button>
      </Stack>
      <GradingUpdateTable />
    </>
  );
};

export default GradingUpdate;
