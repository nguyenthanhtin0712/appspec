import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const theme = useTheme();
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
