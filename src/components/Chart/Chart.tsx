
import React, { FC } from "react";
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
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartStyle = css`
    width: 100%;
    margin: 0 auto;
`;

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Голосование',
      },
    },
  };

  const max = Math.max.apply(null, bill);

  const data = {
    labels,
    datasets: [
      {
        label: `Лидирует команда ${labels[bill.indexOf(max)]}`,
        data: bill,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div css={chartStyle}>
      <Bar options={options} data={data} />
    </div>
  )


  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: bill,
  //       backgroundColor: colors,
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // return (
  //   <div css={chartStyle}>
  //       <Pie data={data} />
  //   </div>
  // );
}



export default Chart;
