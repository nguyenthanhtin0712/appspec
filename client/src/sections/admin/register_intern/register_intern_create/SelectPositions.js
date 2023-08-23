/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { Add } from 'iconsax-react';
import PositionIntership from 'sections/admin/register_intern/register_intern_create/PositionIntership';
import { dispatch } from 'store';
import { getAllRecruitmentPosition } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: '#fff'
}));

export default function GitHubLabel() {
  const positionOptions = useSelector((state) => state.create_register_intern.positionOptions.data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllRecruitmentPosition());
    };
    fetchData();
  }, []);

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) anchorEl.focus();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select-position' : undefined;

  console.log(positionOptions);

  return (
    <>
      {value.map((position) => (
        <PositionIntership key={position.position_id} position={position} />
      ))}
      <Button aria-describedby={id} variant="dashed" color="success" startIcon={<Add />} onClick={handleClick}>
        Thêm vị trí
      </Button>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={{
                borderBottom: `1px solid #eaecef`,
                padding: '8px 10px',
                fontWeight: 600
              }}
            >
              Chọn danh sách vị trí
            </Box>
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
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden'
                    }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color: theme.palette.mode === 'light' ? '#586069' : '#8b949e'
                      }
                    }}
                  >
                    {option.position_name}
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden'
                    }}
                  />
                </li>
              )}
              options={[...positionOptions].sort((a, b) => {
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + positionOptions.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + positionOptions.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.position_name}
              renderInput={(params) => (
                <TextField
                  size="small"
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Tìm kiếm vị trí thực tập"
                  sx={{ padding: 1 }}
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}
