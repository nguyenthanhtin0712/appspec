import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { dispatch } from 'store/index';
import { getAssignmentInfoById, setRegisterSpecialtyId } from 'store/reducers/assignmentInternUserSlice';
import { Box, Button, Fade, Grid, Menu, MenuItem, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ArrowRight, TableDocument } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { ExportResultRegisterSpecialty } from 'export-excel/export-result-register-specialty';
import JobholderItem from 'pages/admin/assignment-intern/JobholderItem';
import ResultTableAdmin from 'sections/admin/assignment_intern/assignment_intern_result/ResultTableAdmin';

const listJobholder = [
  {
    id: 1,
    name: 'Nguyễn Thanh Sang',
    total: 10
  },
  {
    id: 2,
    name: 'Phan Tấn Quốc',
    total: 8
  },
  {
    id: 3,
    name: 'Nguyễn Trung Tín',
    total: 6
  }
];

const RegisterSpecialtyResult = () => {
  const { Id } = useParams();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { majors, infoAssignment } = useSelector((state) => state.assignment_intern_user);

  console.log('infoAssignment', infoAssignment);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (major_id) => {
    ExportResultRegisterSpecialty(infoAssignment.register_specialty_id, major_id);
    handleClose();
  };

  useEffect(() => {
    dispatch(getAssignmentInfoById(Id));
    dispatch(setRegisterSpecialtyId(Id));
  }, [Id]);

  if (!majors || !infoAssignment) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <Stack mb={3} spacing={1}>
            <Typography variant="h4" component="h1">
              {infoAssignment.register_specialty_name}
            </Typography>
            <Stack direction="row" spacing={2} alignItems={'center'}>
              <Typography variant="h6">Từ {formatDateTimeDisplay(infoAssignment.register_specialty_start_date)}</Typography>
              <ArrowRight size="25" color={theme.palette.primary.main} />
              <Typography variant="h6">Đến {formatDateTimeDisplay(infoAssignment.register_specialty_end_date)}</Typography>
            </Stack>
          </Stack>
          <Box my="auto">
            <Button
              variant="contained"
              color="success"
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              startIcon={<TableDocument />}
            >
              Xuất dữ liệu
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{ mt: 1 }}
            >
              {majors.map((major) => (
                <MenuItem onClick={() => handleExport(major?.major_id)} key={major?.major_id}>
                  {major?.major_name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
        <Box>
          <Stack spacing={2}>
            <ResultTableAdmin />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3} columnSpacing={2} position="static" top={0}>
        <Typography variant="h5" mb={2}>
          Danh sách giảng viên hướng dẫn
        </Typography>
        {listJobholder.length > 0 &&
          listJobholder.map((jobholder) => (
            <JobholderItem key={jobholder.id} name={jobholder.name} total={jobholder.total} mb={1}></JobholderItem>
          ))}
      </Grid>
    </Grid>
  );
};

export default RegisterSpecialtyResult;
