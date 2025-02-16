import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import chartOptions from '../assets/chartOptions'


function BarChart({ chartData, idx }) {
  return(
  <div className='ml-6' style={ {width: 400} }>
    <Bar data={chartData} options={chartOptions(idx)}/>
  </div>
  )
}

export default BarChart
