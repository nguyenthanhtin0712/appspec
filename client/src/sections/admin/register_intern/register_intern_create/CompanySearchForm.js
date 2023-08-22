import React, { useEffect, useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import OutlinedInput from '@mui/material/OutlinedInput';
import PopupState, { bindFocus, bindPopover } from 'material-ui-popup-state';
import { SearchNormal1 } from 'iconsax-react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import SimpleBar from 'components/third-party/SimpleBar';

const CompanySearchForm = () => {
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current.offsetWidth);
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);
  return (
    <PopupState variant="popover" popupId="demoPopover">
      {(popupState) => (
        <>
          <OutlinedInput
            ref={inputRef}
            size="small"
            startAdornment={<SearchNormal1 />}
            fullWidth
            placeholder="Tìm kiếm công ty..."
            {...bindFocus(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            sx={{ left: -35, top: 10 }}
          >
            <SimpleBar sx={{ width: inputWidth, minWidth: 345, maxHeight: 300 }}>
              <List dense={true} sx={{ bgcolor: 'background.paper' }}>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty TNHH FPT Software`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty phần mềm Lạc Việt`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Larion`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Hinova`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
                <ListItemButton onClick={popupState.close}>
                  <ListItemText primary={`Công ty Coderschool`} />
                </ListItemButton>
              </List>
            </SimpleBar>
          </Popover>
        </>
      )}
    </PopupState>
  );
};

export default CompanySearchForm;
