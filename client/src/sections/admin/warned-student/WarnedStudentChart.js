import { useTheme } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getStatistical } from 'store/slices/warnedStudentDetailSlice';

const handleData = (statistical) => {
  let result = {
    categories: [],
    data: [
      {
        name: 'Cảnh báo',
        data: []
      },
      {
        name: 'Buộc thôi học',
        data: []
      }
    ]
  };
  statistical.forEach((item) => {
    result.categories.push(item.statistical_key);
    result.data[0].data.push(item.result_CC);
    result.data[1].data.push(item.result_BTH);
  });
  return result;
};

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        total: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    }
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  yaxis: {
    title: {
      text: 'Sinh viên'
    }
  },
  tooltip: {
    y: {
      formatter: (val) => val + ' sinh viên'
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
};

const WarnedStudentChart = ({ id }) => {
  const theme = useTheme();
  const { statistical, filterChart } = useSelector((state) => state.warned_student_detail);
  const { type, majorId, courseId } = filterChart;
  const [options, setOptions] = useState(chartOptions);
  const chartData = useMemo(() => handleData(statistical), [statistical]);

  useEffect(() => {
    dispatch(getStatistical({ id: id, type: type, major_id: majorId, course_id: courseId }));
  }, [courseId, id, majorId, type]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main, theme.palette.error.main],

      xaxis: {
        categories: chartData.categories
      }
    }));
  }, [chartData, theme, statistical]);

  return <ReactApexChart options={options} series={chartData.data} type="bar" height={450} />;
};

export default memo(WarnedStudentChart);
