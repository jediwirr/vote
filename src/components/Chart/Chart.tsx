
import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { css } from "@emotion/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
        "Говоруны", 
        "Операция Э", 
        "Синяя молния", 
        "Золотой Феникс", 
        "Львы", 
        "Шоколадный кот",
        "Шпалерики",
        "Лиловый единорог",
        "Голубой дельфин",
        "Желтый жираф",
        "Стражи галактики",
        "Алое сердце",
    ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "limegreen",
        "rebeccapurple",
        "blue",
        "gold",
        "darkorange",
        "sienna",
        "tan",
        "violet",
        "lightskyblue",
        "yellow",
        "slategray",
        "red"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartStyle = css`
    width: 45%;
`;

const Chart: FC = () => {
  return (
    <div css={chartStyle}>
        <Pie data={data} />
    </div>
  );
}



export default Chart;
