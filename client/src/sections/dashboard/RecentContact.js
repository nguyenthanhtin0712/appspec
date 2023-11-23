import MainCard from 'components/MainCard';
import { Button, Typography } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import { ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';

const recentContact = [
  {
    id: 1,
    name: 'Trần Nhật Sinh',
    time: new Date()
  },
  {
    id: 2,
    name: 'Hoàng Gia Bảo',
    time: new Date()
  },
  {
    id: 3,
    name: 'Đinh Ngọc Ân',
    time: new Date()
  },
  {
    id: 4,
    name: 'Vũ Trung Hiếu',
    time: new Date()
  }
];

const RecentContact = () => {
  return (
    <MainCard
      title="Liên hệ gần đây"
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <Timeline sx={{ marginY: 0 }}>
        {recentContact.map((item, index) => (
          <OrderItem key={item.id} item={item} isLast={index === recentContact.length - 1} />
        ))}
      </Timeline>
      <Button component={Link} to="./contact" variant="contained" color="primary" endIcon={<ArrowRight />} fullWidth>
        Xem chi tiết
      </Button>
    </MainCard>
  );
};

function OrderItem({ item, isLast }) {
  const { name, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant="outlined" color="primary" />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatDateTimeDisplay(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default RecentContact;
