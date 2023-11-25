import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Buildings, DocumentText, Html5, Profile2User } from 'iconsax-react';
import StatisticItem from 'sections/dashboard/StatisticItem';
import RecentContact from 'sections/dashboard/RecentContact';
import RecentJobPost from 'sections/dashboard/RecentJobPost';
import { useEffect } from 'react';
import { dispatch } from 'store';
import { getStatistic } from 'store/slices/dashboardSlice';
import { useSelector } from 'store';

const DashboardDefault = () => {
  const theme = useTheme();
  const statistic = useSelector((state) => state.dashboard.statistic);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStatistic());
    };
    fetchData();
  }, []);

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem
          title="Viên chức"
          count={statistic?.job_holder_number}
          icon={<Profile2User color={theme.palette.primary.dark} size={50} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem
          title="Công ty"
          count={statistic?.company_number}
          icon={<Buildings color={theme.palette.success.dark} size={50} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem title="Trang" count={statistic?.page_number} icon={<DocumentText color={theme.palette.warning.dark} size={50} />} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatisticItem
          title="Tin tuyển dụng"
          count={statistic?.job_post_number}
          icon={<Html5 color={theme.palette.error.dark} size={50} />}
        />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={8}>
        <RecentJobPost />
      </Grid>
      <Grid item xs={12} md={4}>
        <RecentContact />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
