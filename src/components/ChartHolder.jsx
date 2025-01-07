import BarChart from "./BarChart"
import PropTypes from 'prop-types'
import letterToShift from "../utils/letterToShift"

function ChartHolder({ mapPtr, size }) {

    const charts = []
    let guess = ''
    let ourMap = mapPtr
    let ourComponent
    for(let i = 1; i < size + 1; i++) {
      ourComponent = <BarChart key={i} chartData={ourMap.get(i)} idx={i} />
      charts.push(ourComponent)
      console.log('In ChartHolder, ourMap.get(i): ', ourMap.get(i), ' with i = ', i)
      console.log('Grabbing labels[0]: ', ourMap.get(i).labels[0])
      guess += letterToShift(ourMap.get(i).labels[0])
    }

    console.log('guess: ', guess)

    const rows = []

    for(let i = 0; i < charts.length; i += 3) {
      rows.push(charts.slice(i, i + 3))
    }

  return (
    <div className='flex flex-col items-center mt-7'>
      <h1 className="mb-5" >Frequencys for key length {size}</h1>
      <h1 className="mb-5" >Guess for key of length {size}: {guess}</h1>
        {rows.map((row, index) => (
          <div key={index} className="flex flex-row items-center mb-4" >
            {row}
          </div>
        ))}
    </div>
  )
}

ChartHolder.propTypes = {
  mapPtr: PropTypes.instanceOf(Map).isRequired,
  size: PropTypes.number.isRequired

}

export default ChartHolder
