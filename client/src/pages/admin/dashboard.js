import { useTheme } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';

import RepeatCustomerRate from 'sections/dashboard/RepeatCustomerRate';
import { Buildings, DocumentText, Html5, Profile2User } from 'iconsax-react';
import StatisticItem from 'sections/dashboard/StatisticItem';
import RecentContact from 'sections/dashboard/RecentContact';

const DashboardDefault = () => {
  const theme = useTheme();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem title="Viên chức" count="30" icon={<Profile2User color={theme.palette.primary.dark} size={50} />} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem title="Công ty" count="15" icon={<Buildings color={theme.palette.success.dark} size={50} />} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem title="Trang" count="02" icon={<DocumentText color={theme.palette.warning.dark} size={50} />} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem title="Tin tuyển dụng" count="100" icon={<Html5 color={theme.palette.error.dark} size={50} />} />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RepeatCustomerRate />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <RecentContact />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
