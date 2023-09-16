import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RegisterInternTable from 'sections/admin/internship-graduation/InternshipGraduationTable';
import RegisterInternDeleteDialog from 'sections/admin/internship-graduation/InternshipGraduationDeleteDialog';
import { dispatch } from 'store';
import { setInternshipGraduationDialog } from 'store/reducers/internshipGraduationSlice';
import InternshipGraduationDialog from 'sections/admin/internship-graduation/InternshipGraduationDialog';

const InternShipGraduationIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý thực tập tốt nghiệp</Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => dispatch(setInternshipGraduationDialog({ open: true }))}
        >
          Thêm đợt thực tập
        </Button>
      </Stack>
      <RegisterInternTable />
      <RegisterInternDeleteDialog />
      <InternshipGraduationDialog />
    </>
  );
};

export default InternShipGraduationIndex;
