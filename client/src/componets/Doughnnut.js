import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { Globalcontext } from "../context/GlobalState";
import "./Doughnut.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DoughnutChart({ dark }) {
  const { todos } = useContext(Globalcontext);
  const [donePercentage, setDonePercentage] = useState([]);
  const [restPercentage, setRestPercentage] = useState([]);
  const mode = dark ? "dark2" : "light1";
  const backgroundMode = dark ? "rgb(49, 53, 54)" : "rgb(244, 247, 248)";
  const doneColor = dark ? "#90843c" : "#fae360";
  const donePercent = Number.isNaN(donePercentage) ? 0 : donePercentage;
  const restPercent = Number.isNaN(restPercentage) ? 0 : restPercentage;

  useEffect(() => {
    const notDoneTodos = todos.filter((el) => el.completed === false);
    const doneTodos = todos.filter((el) => el.completed === true);
    setDonePercentage(
      ((todos.length - notDoneTodos.length) / todos.length) * 100
    );
    setRestPercentage(((todos.length - doneTodos.length) / todos.length) * 100);
  }, [todos]);

  const options = {
    animationEnabled: true,
    theme: mode, // "light1", "dark1", "dark2"
    backgroundColor: backgroundMode,
    title: {
      text: "Today Progress",
    },
    subtitles: [
      {
        text: `${parseFloat(donePercent).toFixed(0)}% Done`,
        // "90% Done",
        verticalAlign: "center",
        fontSize: 17,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          {
            name: "Done",
            y: donePercent,
            color: doneColor,
          },
          {
            name: "Rest",
            y: restPercent,
            color: "rgb(76, 83, 85)",
          },
        ],
      },
    ],
  };

  return (
    <div className="douhnut">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default DoughnutChart;

// import React from "react";
// import { Doughnut } from "react-chartjs-2";

// function Doughnnut({ doneTodosLength, todos, justTodos }) {
//   // const unPinnedTodos = todos.filter((todo => {
//   //     return todo.pinned != "Pin";
//   // }))

//   const data = {
//     labels: ["Rest", "Done"],
//     datasets: [
//       {
//         label: "Active of last week",
//         data: [20, 10],
//         backgroundColor: ["rgba(236, 245, 247,0.4)", "rgb(250, 227, 96)"],
//       },
//     ],
//   };

//   const options = {
//     // title: {
//     //     display: true,
//     //     text: 'WEEKLY'
//     // },
//     // scales: {
//     //     yAxes: [
//     //         {
//     //             ticks: {
//     //                 stepSize: 10
//     //             }
//     //         }
//     //     ]
//     // }
//   };
//   return (
//     <div>
//       <Doughnut data={data} options={options} />
//     </div>
//   );
// }

// export default Doughnnut;
