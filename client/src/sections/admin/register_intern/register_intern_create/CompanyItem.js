import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';
import { removeCompanySelected, setIsInterview } from 'store/reducers/createRegisterInternSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Buildings } from 'iconsax-react';
import { useTheme } from '@mui/material';
import SelectPositions from 'sections/admin/register_intern/register_intern_create/SelectPositions';

const CompanyItem = ({ company }) => {
  const theme = useTheme();

  return (
    <Stack rowGap={1} sx={{ p: 2, border: '1px solid', borderRadius: 2, borderColor: theme.palette.divider, position: 'relative' }}>
      <Tooltip title="Xoá công ty" placement="top" arrow>
        <IconButton
          onClick={() => dispatch(removeCompanySelected(company))}
          size="small"
          shape="rounded"
          color="error"
          sx={{ position: 'absolute', top: 5, right: 5 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Tooltip>
      <Stack spacing={1.5} direction="row" alignItems="flex-end" mb={2}>
        <Buildings size="32" color={theme.palette.secondary[500]} variant="Bulk" />
        <Typography fontSize={15} fontWeight={600}>
          {company.company_name}
        </Typography>
      </Stack>
      <SelectPositions company={company} />
      <FormControlLabel
        control={
          <Switch
            id="isInterview"
            name="isInterview"
            checked={company.isInterview}
            onChange={(e) => dispatch(setIsInterview({ company_id: company.company_id, isInterview: e.target.checked }))}
            inputProps={{ 'aria-label': 'Switch A' }}
          />
        }
        label="Yêu cầu phỏng vấn"
        sx={{ '& .MuiFormControlLabel-label': { fontSize: 15 } }}
      />
    </Stack>
  );
};

export default CompanyItem;
