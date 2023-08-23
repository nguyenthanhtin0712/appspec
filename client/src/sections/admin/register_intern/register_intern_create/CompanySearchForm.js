import React, { useEffect, useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import OutlinedInput from '@mui/material/OutlinedInput';
import PopupState, { bindFocus, bindPopover } from 'material-ui-popup-state';
import { SearchNormal1, Building4, SearchStatus1, EmojiSad } from 'iconsax-react';
import { Box, CircularProgress, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import SimpleBar from 'components/third-party/SimpleBar';
import { dispatch } from 'store';
import { fetchDataCompany, setCompanyQuery, setCompanySelected } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import useDebounce from 'hooks/useDebounce';

const CompanySearchForm = () => {
  const theme = useTheme();
  const { companyQuery, companyData, isLoading } = useSelector((state) => state.create_register_intern);
  const queryDebounce = useDebounce(companyQuery, 500);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDataCompany(queryDebounce));
    };
    if (queryDebounce) fetchData();
  }, [queryDebounce]);

  useEffect(() => {
    if (inputRef.current) setInputWidth(inputRef.current.offsetWidth);
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
            value={companyQuery}
            onChange={(e) => dispatch(setCompanyQuery(e.target.value))}
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
            PaperProps={{
              sx: {
                boxShadow: theme.customShadows.z1
              }
            }}
            sx={{ left: -35, top: 10 }}
          >
            <SimpleBar sx={{ width: inputWidth, minWidth: 345, maxHeight: 300 }}>
              {queryDebounce == '' ? (
                <SearchBoxMessage icon={<SearchStatus1 />} message="Nhập tên công ty vào ô tìm kiếm" />
              ) : isLoading ? (
                <Box sx={{ px: 2, py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : companyData.length > 0 ? (
                <SearchResult data={companyData} popupState={popupState} />
              ) : (
                <SearchBoxMessage icon={<EmojiSad />} message="Không có dữ liệu" />
              )}
            </SimpleBar>
          </Popover>
        </>
      )}
    </PopupState>
  );
};

const SearchBoxMessage = ({ icon, message }) => {
  const theme = useTheme();

  const defaultIconProps = {
    size: 80,
    variant: 'Bulk',
    color: theme.palette.primary.main
  };

  const iconWithDefaultProps = React.cloneElement(icon, defaultIconProps);
  return (
    <Box sx={{ px: 2, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {iconWithDefaultProps}
      <Typography>{message}</Typography>
    </Box>
  );
};

const SearchResult = ({ data, popupState }) => {
  const companySelected = useSelector((state) => state.create_register_intern.companySelected);
  const handleClick = (company) => {
    dispatch(setCompanySelected(company));
    dispatch(setCompanyQuery(''));
    popupState.close();
  };
  return (
    <List dense={true} sx={{ bgcolor: 'background.paper' }}>
      {data.map((company) => (
        <ListItemButton
          selected={!!companySelected.find((item) => item.company_id === company.company_id)}
          onClick={() => handleClick(company)}
          key={company.company_id}
          sx={{ display: 'flex', gap: 1 }}
        >
          <ListItemIcon>
            <Building4 size={19} />
          </ListItemIcon>
          <ListItemText primary={company.company_name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default CompanySearchForm;
