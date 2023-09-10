/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Add, ArrowLeft, CloseCircle } from 'iconsax-react';
import PositionIntership from 'sections/admin/internship-graduation/register_intern_create/PositionIntership';
import { dispatch } from 'store';
import {
  createRecruitmentPosition,
  getAllRecruitmentPosition,
  setPositionOptions,
  setRecruitmentPosition
} from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useState } from 'react';
import IconButton from 'components/@extended/IconButton';
import { toast } from 'react-toastify';
import { Stack, Tooltip, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: '#fff',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent'
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
        backgroundColor: theme.palette.action.hover
      }
    }
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative'
  }
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: `0 8px 24px rgba(149, 157, 165, 0.2)`,
  borderRadius: 6,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: '#24292e',
  backgroundColor: '#fff'
}));

export default function SelectPositions({ company }) {
  const theme = useTheme();
  const companyId = company.company_id;
  const recruitmentPosition = company.positions;
  const { isLoading, data } = useSelector((state) => state.create_register_intern.positionOptions);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pendingValue, setPendingValue] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setPendingValue(recruitmentPosition);
  }, [recruitmentPosition]);

  const handleClick = useCallback(
    async (event) => {
      setAnchorEl(event.currentTarget);
      await dispatch(getAllRecruitmentPosition(companyId));
    },
    [companyId]
  );

  const handleClose = useCallback(() => {
    dispatch(setRecruitmentPosition({ companyId, positions: pendingValue }));
    dispatch(setPositionOptions([]));
    if (anchorEl) anchorEl.focus();
    setAnchorEl(null);
  }, [anchorEl, companyId, pendingValue]);

  const open = Boolean(anchorEl);
  const id = open ? 'select-position' : undefined;

  return (
    <>
      <TransitionGroup>
        {recruitmentPosition.map((position) => (
          <Collapse key={position.position_id}>
            <PositionIntership position={position} />
          </Collapse>
        ))}
      </TransitionGroup>
      <Button aria-describedby={id} variant="shadow" color="success" startIcon={<Add />} onClick={handleClick}>
        Thêm vị trí
      </Button>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="top-start">
        <ClickAwayListener onClickAway={handleClose}>
          {openForm ? (
            <div>
              <CreateRecruitmentPositionForm setOpenForm={setOpenForm} companyId={companyId} />
            </div>
          ) : (
            <div>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ borderBottom: `1px solid #eaecef`, padding: '8px 10px' }}
              >
                <Typography fontWeight={600} fontSize={13}>
                  Chọn danh sách vị trí
                </Typography>
                <CloseCircle size={20} color={theme.palette.error.main} style={{ cursor: 'pointer' }} onClick={handleClose} />
              </Stack>
              <Autocomplete
                open
                multiple
                onClose={(event, reason) => {
                  if (reason === 'escape') handleClose();
                }}
                value={pendingValue}
                onChange={(event, newValue, reason) => {
                  if (event.type === 'keydown' && event.key === 'Backspace' && reason === 'removeOption') {
                    return;
                  }
                  setPendingValue(newValue);
                }}
                disableCloseOnSelect
                PopperComponent={PopperComponent}
                renderTags={() => null}
                noOptionsText="Không có vị trí"
                renderOption={(props, option, { selected }) => (
                  <li {...props} style={{ padding: '10px 14px' }}>
                    <Box
                      component={DoneIcon}
                      sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                      style={{ visibility: selected ? 'visible' : 'hidden' }}
                    />
                    <Box sx={{ flexGrow: 1, '& span': { color: '#586069' } }}>{option.position_name}</Box>
                    <Box
                      component={CloseIcon}
                      sx={{ opacity: 0.6, width: 18, height: 18 }}
                      style={{ visibility: selected ? 'visible' : 'hidden' }}
                    />
                  </li>
                )}
                loading={isLoading}
                options={[...data].sort((a, b) => {
                  let ai = recruitmentPosition.indexOf(a);
                  ai = ai === -1 ? recruitmentPosition.length + data.indexOf(a) : ai;
                  let bi = recruitmentPosition.indexOf(b);
                  bi = bi === -1 ? recruitmentPosition.length + data.indexOf(b) : bi;
                  return ai - bi;
                })}
                isOptionEqualToValue={(option, value) => option.position_id === value.position_id}
                getOptionLabel={(option) => option.position_name}
                renderInput={(params) => <SearchInput params={params} openForm={openForm} setOpenForm={setOpenForm} />}
              />
            </div>
          )}
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}

const SearchInput = ({ params, setOpenForm }) => {
  return (
    <TextField
      size="small"
      ref={params.InputProps.ref}
      inputProps={params.inputProps}
      autoFocus
      placeholder="Tìm kiếm vị trí thực tập"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Thêm vị trí mới" arrow>
              <IconButton variant="contained" shape="rounded" size="small" edge="end" onClick={() => setOpenForm(true)}>
                <Add color="#fff" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
      sx={{
        padding: 1,
        '& .MuiInputBase-root': {
          paddingRight: '16px!important'
        }
      }}
    />
  );
};

const CreateRecruitmentPositionForm = ({ setOpenForm, companyId }) => {
  const [name, setName] = useState('');

  const handleClick = async () => {
    if (!name) {
      toast.warning('Tên vị trí là bắt buộc !');
    } else {
      const positionCreate = { position_name: name, company_id: companyId };
      try {
        const result = await dispatch(createRecruitmentPosition(positionCreate));
        if (result && !result.error) {
          setOpenForm(false);
          toast.success('Thêm vị trí thành công');
        } else {
          toast.error(result.payload.errors?.position_name[0]);
        }
        console.log(result);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ borderBottom: `1px solid #eaecef`, padding: '8px 10px' }}>
        <ArrowLeft size={20} style={{ cursor: 'pointer' }} onClick={() => setOpenForm(false)} />
        <span style={{ fontWeight: 600 }}>Thêm vị trí mới</span>
      </Stack>
      <TextField
        size="small"
        autoFocus
        placeholder="Nhập tên vị trí "
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Tạo vị trí" arrow>
                <IconButton variant="contained" shape="rounded" size="small" edge="end" onClick={handleClick}>
                  <Add color="#fff" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        sx={{
          padding: 1,
          '& .MuiInputBase-root': {
            paddingRight: '16px!important'
          }
        }}
      />
    </>
  );
};
