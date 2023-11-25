import MainCard from 'components/MainCard';
import { Button, Typography } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dispatch } from 'store';
import { getRecentContact } from 'store/slices/dashboardSlice';
import LoadingBox from 'components/LoadingBox';

const RecentContact = () => {
  const recentContact = useSelector((state) => state.dashboard.recentContact);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRecentContact());
    };
    fetchData();
  }, []);

  console.log(recentContact);

  return (
    <MainCard
      title="Liên hệ gần đây"
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      {recentContact.isLoading ? (
        <LoadingBox height={400} />
      ) : (
        <>
          <Timeline sx={{ mb: 2, mt: 0 }}>
            {recentContact.data.map((item, index) => (
              <OrderItem key={item.contact_id} item={item} isLast={index === recentContact.length - 1} />
            ))}
          </Timeline>
          <Button component={Link} to="./contact" variant="dashed" endIcon={<ArrowRight />} fullWidth>
            Xem chi tiết
          </Button>
        </>
      )}
    </MainCard>
  );
};

function OrderItem({ item, isLast }) {
  const { contact_fullname, created_at } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant="outlined" color="primary" />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{contact_fullname}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatDateTimeDisplay(created_at)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default RecentContact;
