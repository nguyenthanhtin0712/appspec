import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getStatistical } from 'store/reducers/warnedStudentDetailSlice';

const handleData = (statistical) => {
  let result = {
    categories: [],
    chartData: [
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
    result.chartData[0].data.push(item.result_CC);
    result.chartData[1].data.push(item.result_BTH);
  });
  return result;
};

const ApexChart = () => {
  const theme = useTheme();
  const statistical = useSelector((state) => state.warned_student_detail.statistical);

  useEffect(() => {
    dispatch(getStatistical({ id: 2, type: 'major', major_id: '', course_id: '' }));
  }, []);

  console.log(handleData(statistical));

  const [chartData] = useState([
    {
      name: 'Cảnh báo',
      data: [44, 55, 41, 37, 22, 43, 21]
    },
    {
      name: 'Buộc thôi học',
      data: [53, 32, 33, 52, 13, 43, 32]
    }
  ]);

  const [chartOptions] = useState({
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
    colors: [theme.palette.warning.main, theme.palette.error.main],

    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      title: {
        text: 'Khoá'
      }
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
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartData} type="bar" height={450} />
    </div>
  );
};

export default ApexChart;
