
import React, { FC, useEffect, useState } from "react";
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


  let [placeArr, setPlaceArr] = useState([0, 1, 2])

  useEffect(() => {
    placeArr = [-1, -1, -1]
    let max = 0;
    for(let i = 0; i < placeArr.length; i++){
      max = 0;
      for(let j = 0; j < bill.length; j++){
        if(max <= bill[j] && !!!placeArr.includes(j)) {
          max = bill[j];
          placeArr[i] = j;
        }
      }
    }
    setPlaceArr(placeArr)
  }, [bill] )
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
        text: `1 место - ${labels[placeArr[0]]}\
         2 - ${labels[placeArr[1]]}\
         3 - ${labels[placeArr[2]]}`,
         font: {
           size: 26
         }
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
        max: Math.ceil(bill[placeArr[0]] / 6) * 8 + 5
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
