
import React, { FC } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
import { css } from "@emotion/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Anchor } from "chartjs-plugin-datalabels/types/options";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const chartStyle = css`
//     width: 100%;
//     height: 550px;
// `;

interface ChartProps {
  bill: number[];
  labels: string[];
  colors: string[];
}

const Chart: FC<ChartProps> = ({bill, labels, colors}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const max = Math.max.apply(null, bill);
  // let sum = 0
  // bill.forEach( (item) => {sum += item} )

  const options = {
    //indexAxis: 'y' as const,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: `В голосовании лидирует команда ${labels[bill.indexOf(max)]}`,
      },
      datalabels:{
        color: 'black',
        anchor: 'end' as Anchor,
        align: 'top' as Anchor,
        formatter: function(value: any) {
          return value
        }
      }
    },
    scales:{
      y: {
        beginAtZero: true,
      }
    },
    animation: {
      duration:0,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        axis:'y',
        label: `Отдано голосов: `,
        data: bill,
        backgroundColor: colors,
      },
    ],
  };


  return (
    <div style={{height:'100%'}}>
      <Bar options={options} data={data}/>
    </div>  
  )
}



export default Chart;
