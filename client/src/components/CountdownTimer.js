import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetTime));

  function calculateTimeRemaining(targetTime) {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
    const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateTimeRemaining(targetTime);
      setTimeRemaining(remaining);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <span>{timeRemaining.days} ngày</span>
        <span>{timeRemaining.hours} giờ</span>
        <span>{timeRemaining.minutes} phút</span>
        <span>{timeRemaining.seconds} giây</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
