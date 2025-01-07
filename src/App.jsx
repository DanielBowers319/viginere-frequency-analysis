import { useEffect, useState } from 'react'
import './App.css'
import initializeNestedMaps from './utils/initializeNestedMaps';
import initializeNestedArrayMaps from './utils/initializeNestedArrayMaps';
import initializeNestedData from './utils/initializeNestedData';
import isValidCharacter from './utils/isValidCharacter';
import updateLetterData from './utils/updateLetterData';
import ChartHolder from './components/ChartHolder';
//import {letterFrequency} from './Data.js'

function App() {
  const [letterData, setLetterData] = useState(new Map());
  const [sortedLetterMap, setSortedLetterMap] = useState([])
  const [keyNumber, setKeyNumber] = useState()
  const [counter, setCounter] = useState()
  const [graphData, setGraphData] = useState()
  const [components, setComponents] = useState()

  const updateKeyNum = () => {
    let currNum = parseInt(document.getElementById('keylength-input').value, 10)
    setKeyNumber(currNum)
    setLetterData(initializeNestedMaps(currNum))
    setSortedLetterMap(initializeNestedArrayMaps(currNum))
    setGraphData(initializeNestedData(currNum))
    setCounter(0)
  }

  const readText = () => {
    console.log('reading text')
    let innerCount = counter
    let textToAdd = document.getElementById('ciphertext-input').value
    //console.log('textToAdd: ', textToAdd)
    for(let i = 0; i < textToAdd.length; i++) {
      if(!isValidCharacter(textToAdd[i])) {
        continue
      }
      //console.log('past valid character block')
      for(let j = 1; j < keyNumber + 1; j++) {
        //console.log('j: ', j, 'innerCount: ', innerCount, ' innerCount % j + 1: ', (innerCount % j) + 1, 'letter: ', textToAdd[i] )
        updateLetterData({
          setLetterData,
          outerKey: j,
          innerKey: (innerCount % j) + 1,
          letter: textToAdd[i]
        })
      }
      //console.log('Finished adding text, incrementing counter')
      innerCount++
    }

    setCounter(innerCount)
  }

  
  useEffect(() => {
    console.log('updatedKeyNumber', keyNumber)
  }, [keyNumber])

  useEffect(() => {
    console.log('Finished Reading text')
    console.log('updatedKeyNumber', keyNumber)
    console.log('letterData: ', letterData)
    console.log('sortedLetterMap: ', sortedLetterMap)
    console.log('counter: ', counter)
    if(counter != 0) {
      for(let i = 1; i < keyNumber + 1; i++) {
        const innerMap = letterData.get(i)
        for(let j = 1; j < i + 1; j++) {
          const letterDataArray = Array.from(innerMap.get(j))
          letterDataArray.sort((a, b) => b[1] - a[1])
          setSortedLetterMap(prevMap => {
            const newArrayMap = new Map(prevMap)
            //console.log('newArrayMap: ', newArrayMap)
            const outerArrayMap = newArrayMap.get(i)
            //console.log('outerArrayMap: ', outerArrayMap)
            outerArrayMap.set(j, letterDataArray)
            return newArrayMap
          })
        }
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    console.log('Updated Sorted Letter Map: ', sortedLetterMap)
    if(counter != 0) {
      for(let i = 1; i < keyNumber + 1; i++) {
        const innerMap = sortedLetterMap.get(i)
        for(let j = 1; j < i + 1; j++) {
          const sortedLetterData = innerMap.get(j)
          setGraphData(prevData => {
            const newGraphMap = new Map(prevData)
            //console.log('newGraphMap: ', newGraphMap)
            const outerMap = newGraphMap.get(i)
            const tempData = {
              labels: sortedLetterData.map((letter) => letter[0]),
              datasets: [
                {
                  label: 'Frequency',
                  data: sortedLetterData.map((freq) => freq[1])
                }
              ]
            }
            //console.log('outerMap: ', outerMap)
            outerMap.set(j, tempData)
            return newGraphMap
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedLetterMap])

  useEffect(() => {
    console.log('graphData: ', graphData)

    const newComps = []
    
    if(counter != 0) {
      for(let i = 1; i < keyNumber + 1; i++) {
        const ourMap = graphData.get(i)
        newComps[i] = []
        const innerVec = newComps[i]
        innerVec.push(<ChartHolder key={i} mapPtr={ourMap} size={i}/>)
      }

      setComponents(newComps)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData])


  return (
    <div className='bg-blue-950 min-h-screen h-full w-full flex items-center justify-center text-gray-200 overflow-y-auto '>  
      <div className='flex flex-col flex-grow items-center' >
        <h1 className='mt-8' >Viginere Cipher</h1>
        <h1>Frequency Analysis</h1>
        <input type='number' className='text-black' placeholder='Potential Key Lengths' id='keylength-input'></input>
        <div className='flex flex-row items-center'>
          <button className='mr-5 bg-purple-600 p-4 text-black' onClick={updateKeyNum}>Confirm Key Length</button>
          <h2>Warning: Updating your number of keys will delete your previous input ciphertext</h2>
        </div>
        <textarea id='ciphertext-input' className='text-black' placeholder='Ciphertext'></textarea>
        <button className=' bg-purple-600 p-4 text-black mt-5' onClick={readText}>Analyze</button>
        <div>{components}</div>
      </div>
    </div>
  )
}

//<BarChart chartData={} />

export default App;
