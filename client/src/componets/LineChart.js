import React, { Component } from 'react';
import './LineChart.css';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
function LineChart({dark}) {
// class LineChart extends Component {
	// render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Last Week Progress"
			},
			axisY: {
				title: "Last Week",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Day of Week",
				prefix: "D",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 5 }
				]
			}]
		}
		
		return (
		<div className="lineChart">
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	// }
}

export default LineChart;                           




// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import Moment from 'moment';

// function LineChart({lastSevenDays}) {

//     const one = Moment().format('ddd');
//     const two = Moment().subtract(1, 'd').format('ddd');
//     const three = Moment().subtract(2, 'd').format('ddd');
//     const four = Moment().subtract(3, 'd').format('ddd');
//     const five = Moment().subtract(4, 'd').format('ddd');
//     const six = Moment().subtract(5, 'd').format('ddd');
//     const seven = Moment().subtract(6, 'd').format('ddd');

//     const data = {
//         labels: [seven, six, five, four, three, two, one],
//         datasets: [
//             {
//                 label: 'Last Seven days',
//                 data: [40, 100, 20, 40, 50, 30, 80 ],
//                 backgroundColor: 'rgba(236, 245, 247,0.4)',
//                 borderColor: ' rgb(250, 227, 96)',
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: ' rgb(250, 227, 96)',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: ' rgb(250, 227, 96)',
//                 pointHoverBorderColor: 'rgba(220,220,220,1)',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 1,
//             }
//         ]
//     }

//     const options = {
//         // title: {
//         //     display: true,
//         //     text: 'WEEKLY'
//         // },
//         scales: {
//             yAxes: [
//                 {
//                     ticks: {
//                         stepSize: 10
//                     }
//                 }
//             ]
//         }
//     }
//     return (
//         <div>
//             <Line data={data} options={options} />
//         </div>
//     )
// }

// export default LineChart
